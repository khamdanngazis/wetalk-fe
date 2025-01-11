import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMessage, addNotification, updateMessage } from "../redux/slices/chatRoomSlice";
import { MessageSocket } from "../types/message";
import { Room } from "../types/room";

export const useHandleIncomingMessages = (
  message: MessageSocket | null,
  rooms: Room[],
  selectedRoom: Room | null,
  userId: string,
  sendMessage: (msg: MessageSocket) => void
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const room = rooms.find((r) => r.id === message.chat_room_id);
      if (room) {
        const existingMessageIndex = room.messages.findIndex((m) => m.id === message.id);
        if (existingMessageIndex === -1) {
          dispatch(
            addMessage({
              roomId: room.id,
              message: {
                id: message.id,
                text: message.content,
                type: message.sender_id === userId ? "outgoing" : "incoming",
                time: message.timestamp,
                status: message.status,
              },
            })
          );
        } else {
          dispatch(
            updateMessage({
              roomId: room.id,
              messageId: message.id,
              updatedMessage: {
                ...room.messages[existingMessageIndex],
                status: message.status,
                text: message.content,
              },
            })
          );
        }

        if (message.sender_id !== userId && message.status === 1) {
          const status = room.id !== selectedRoom?.id ? 2 : 3;
          if (status === 2) {
            dispatch(addNotification({ roomId: room.id }));
          }
          sendMessage({ ...message, status, receiver_id: userId });
        }
      }
    }
  }, [message, rooms, selectedRoom, userId, sendMessage, dispatch]);
};
