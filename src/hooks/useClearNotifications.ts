import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearMessageNotification } from "../redux/slices/chatRoomSlice";
import { Room } from "../types/room";

export const useClearNotifications = (selectedRoom: Room | null, room: Room | undefined) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (room?.id) {
      dispatch(clearMessageNotification({ roomId: room.id }));
    }
  }, [selectedRoom, room, dispatch]);
};
