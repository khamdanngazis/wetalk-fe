import {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import useWebSocket from "../../hooks/useWebSocket";
import { useLogin } from "../../hooks/useLogin";
import { MessageSocket } from "../../types/message";
import { v4 as uuidv4 } from "uuid";
import { addMessage, addNotification, updateMessage,clearMessageNotification } from "../../redux/slices/chatRoomSlice";
import { Message } from "../../types/message";
import TextMessage from "../elements/TextMessage";
import { formatDateToHeader } from "../../utils/formatTime";
import { MessageStatus } from "../../types/message";

interface ChatMessageProps {
}

const ChatMessage: React.FC<ChatMessageProps> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [rows, setRows] = useState(1);
    const maxRows = 7;
    const [inputMessage, setInputMessage] = useState("");
    const token = localStorage.getItem("token") || "";
    const user = useLogin();
    const path = user?.socket_group_id || "";
    const userId = user?.user_id || "";
    const { message, sendMessage, isConnected } = useWebSocket({ path, token, userId });

   
    const selectedRoom = useSelector(
        (state: RootState) => state.selectedRoom.selectedRoom
    );

    const rooms = useSelector((state: RootState) => state.rooms.data.rooms);
    const room = rooms.find((r) => r.id === selectedRoom?.id);

    useEffect(() => {   
        dispatch(clearMessageNotification({ roomId: room?.id }));
        if (room?.messages) {
            room?.messages.map((msg) => {
                if (msg.type === "incoming" && (msg.status == "1" || msg.status == "2")) {
                    const newMessage: MessageSocket = {
                        id: msg.id,
                        sender_id: userId,
                        chat_room_id: room?.id || "",
                        receiver_id:  userId,
                        content: msg.text,
                        timestamp: new Date().toISOString(),
                        participants: room?.participants || [],
                        status: 3,
                    };
                    console.log("update message", newMessage);
                    sendMessage(newMessage);
                }
            });
        }
      }, [selectedRoom]);

    useEffect(() => {
        if (message) {
          const room = rooms.find((r) => r.id === message.chat_room_id);
          if (room ) {
            if (!room.messages) {
                const newMessage: Message = {
                    id: message.id,
                    text: message.content,
                    type: message.sender_id === userId ? "outgoing" : "incoming",
                    time: message.timestamp,
                    status: (message.status ?? null) as MessageStatus,
                };
                dispatch(addMessage({ roomId: room.id, message: newMessage }));
            }else{
                const existingMessageIndex = room.messages.findIndex((m) => m.id === message.id);
                if (existingMessageIndex === -1) {
                const newMessage: Message = {
                    id: message.id,
                    text: message.content,
                    type: message.sender_id === userId ? "outgoing" : "incoming",
                    time: message.timestamp,
                    status: (message.status ?? null) as MessageStatus,
                };
                dispatch(addMessage({ roomId: room.id, message: newMessage }));
                } else {
                const updatedMessage = {
                    ...room.messages[existingMessageIndex],
                    status: message.status,
                    text: message.content,
                };
                dispatch(updateMessage({ roomId: room.id, messageId: message.id, updatedMessage }));
                }
            }
      
            if (message.sender_id !== userId && message.status === 1) {
                var status = 3;
                if (room.id !== selectedRoom?.id) {
                    dispatch(addNotification({ roomId: room.id }));
                    status = 2;
                }
                const updatedMessage = { ...message, status: status, receiver_id: userId };
                sendMessage(updatedMessage);
            }
          }
        }
      }, [message]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            if (event.shiftKey) {
                setInputMessage((prev) => prev + "\n");
                adjustRows(inputMessage + "\n");
            } else {
                if (isConnected && room) { 
                    const newMessage: MessageSocket = {
                        id: uuidv4(),
                        sender_id: userId,
                        chat_room_id: room?.id || "",
                        receiver_id:  "",
                        content: inputMessage,
                        timestamp: new Date().toISOString(),
                        participants: room?.participants || [],
                    };
                    sendMessage(newMessage);
                }else{
                    console.error("WebSocket is not connected");
                    
                }
                event.preventDefault();
                if (inputMessage.trim()) {
                    setInputMessage(""); 
                }
            }
        }
    };

      const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setInputMessage(newValue);
        adjustRows(newValue);
      };
    
      const adjustRows = (value: string) => {
        const lineCount = value.split("\n").length;
        setRows(Math.min(lineCount, maxRows));
      };

      const lastMessageRef = useRef<HTMLDivElement | null>(null);

      useEffect(() => {
        if (lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [room?.messages]);

      let lastMessageDate = '';

    return(
        <>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
            {room && room.messages && room.messages.map((msg, index) => {
                const messageDate = formatDateToHeader(msg.time);

                // Check if the message's date is different from the last message's date
                const isNewDate = messageDate !== lastMessageDate;
                lastMessageDate = messageDate; // Update last message date for comparison

                return (
                <div key={msg.id}>
                    {isNewDate && (
                        <div className="text-center text-gray-500 text-xs my-4">
                            <span className="bg-white p-2 rounded shadow-md">{messageDate}</span>
                        </div>
                    )}
                    <TextMessage
                        message={msg}
                        isLastMessage={index === room.messages.length - 1}
                        lastMessageRef={index === room.messages.length - 1 ? lastMessageRef : null}
                    />
                </div>
                );
            })}
        </div>
        {room && (
        <div className="p-4 bg-gray-100 border-t flex items-center space-x-4">
            <textarea
            value={inputMessage}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            rows={rows}
            placeholder="Type a message..."
            className="flex-1 resize-none bg-white p-3 rounded-md border focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-sm"
            style={{ lineHeight: "12px" }} 
            />
        </div>
        )}
        {!room && (
            <div className="flex items-center justify-center h-[84%] text-center bg-gray-50">
                <div>
                <p className="text-lg font-semibold text-gray-700">
                    No conversation is currently active.
                </p>
                <p className="text-sm text-gray-500">
                    Please start a new conversation or select an existing one.
                </p>
                </div>
            </div>
        )}
      </>
    );
};

export default ChatMessage;
