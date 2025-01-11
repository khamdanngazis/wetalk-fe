import axios from 'axios';
import { User } from '../types/user';

type SearchUserResponse = {
    message: string;
    data:    User[];
};

const searchUser = async (q: string, token: string): Promise<SearchUserResponse> => {
  try {
    const API_URL = import.meta.env.VITE_CHAT_BE_HOST+ `/api/users/search?q=${q}`;
    const response = await axios.get<SearchUserResponse>(API_URL, {
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.data.length === 0) {
        return { message: 'No users found', data: [] };
    }
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching rooms: ${error}`);
  }
};

export default searchUser;