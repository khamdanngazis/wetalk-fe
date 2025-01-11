import axios from 'axios';

const API_URL = import.meta.env.VITE_CHAT_BE_HOST+ '/api/users/register';

interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterParams) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

