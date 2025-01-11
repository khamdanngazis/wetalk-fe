import axios from 'axios';
import { MessageState } from '../types/message';

const API_URL = import.meta.env.VITE_CHAT_BE_HOST+ '/api/messages/history';

const getMessageHistory = async (limit: number, page: number, room_id:string, token: string): Promise<MessageState> => {
  try {
    const response = await axios.get<MessageState>(API_URL, {
      params: { limit, page, room_id },
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching rooms: ${error}`);
  }
};

export default getMessageHistory;