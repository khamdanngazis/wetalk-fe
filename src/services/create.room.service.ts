import axios from 'axios';
import { Room } from '../types/room';

const API_URL = import.meta.env.VITE_CHAT_BE_HOST+ '/api/rooms';

type CreateRoomrResponse = {
  message: string;
  data:    Room;
};

export const createRoom = async (users: string[], roomName: string, isGroup: Boolean, token: string) => {
  try {
    const data = {
      user_ids: users,
      roomName: roomName,
      isGroup: isGroup,
    }
    const response = await axios.post<CreateRoomrResponse>(API_URL, data, {
      params:{data},
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
