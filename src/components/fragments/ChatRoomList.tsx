// src/components/ChatRoomList.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {fetchRooms, setMessages } from "../../redux/slices/chatRoomSlice";
import ChatRoom from "../elements/ChatRoom";
import { selectRoom } from "../../redux/slices/chatRoomSelected";
import { Room } from "../../types/room";
import getMessageHistory from "../../services/message.history.service";
import { formatMessageTime } from "../../utils/formatTime";


interface ChatRoomListProps {
    setShowChatWindow: (show: boolean) => void;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({setShowChatWindow}) => {
  const dispatch = useDispatch<AppDispatch>();
  const rooms = useSelector((state: RootState) => state.rooms.data.rooms);
  const selectedRoom = useSelector(
    (state: RootState) => state.selectedRoom.selectedRoom
  );
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchAllRoomsAndMessages = async () => {
      try {
        // Fetch rooms
        const roomsResponse = await dispatch(fetchRooms({ limit: 10, page: 1, token })).unwrap();

        // Fetch messages for each room
        const fetchMessagesPromises = roomsResponse.data.rooms.map(async (room: Room) => {
          try {
            const messageHistory = await getMessageHistory(20, 1, room.id, token);
            dispatch(setMessages({ roomId: room.id, messages: messageHistory.data.messages }));
          } catch (error) {
            console.error(`Error fetching messages for room ${room.id}:`, error);
          }
        });

        await Promise.all(fetchMessagesPromises);
      } catch (error) {
        console.error("Error fetching rooms or messages:", error);
      }
    };

    fetchAllRoomsAndMessages();
  }, [dispatch]);
  


  const handleSelectRoom = (room: Room) => {
    const selectedRoom : Room = {
      id: room.id,
      name: room.name,
      last_message: "",
      last_message_time: "",
      participants: [],
      messages: [],
      messageNotification: 0
    };
    dispatch(selectRoom(selectedRoom));

    setShowChatWindow(true);
  };

  const sortedRooms = [...rooms].sort((a, b) => {
    const aTime = a.last_message_time ? new Date(a.last_message_time).getTime() : null;
    const bTime = b.last_message_time ? new Date(b.last_message_time).getTime() : null;

    // Handle rooms without last_message_time
    if (aTime === null && bTime === null) return 0; // Both without time, no sorting needed
    if (aTime === null) return 1; // Room a has no time, move it down
    if (bTime === null) return -1; // Room b has no time, move it down

    // Sort by time (latest first)
    return bTime - aTime;
  });

  return (
    <div className="flex-1 overflow-y-auto">

      {sortedRooms.map((room) => (
        <div key={room.id}>
          <ChatRoom
            name={room.name}
            lastMessage={room.last_message}
            time={formatMessageTime(room.last_message_time)}
            isSelected={selectedRoom?.name === room.name}
            onSelect={() => handleSelectRoom(room)}
            badgeCount={room.messageNotification}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
