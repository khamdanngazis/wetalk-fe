import axios from 'axios';
import { RoomsState } from '../types/room';

const API_URL = import.meta.env.VITE_CHAT_BE_HOST+ '/api/rooms';


const getRooms = async (limit: number, page: number, token: string): Promise<RoomsState> => {
  try {
    const response = await axios.get<RoomsState>(API_URL, {
      params: { limit, page },
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

export default getRooms;