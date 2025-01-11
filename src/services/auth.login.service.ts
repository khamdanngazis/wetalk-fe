import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { User } from '../types/user';

const API_URL = import.meta.env.VITE_CHAT_BE_HOST+ '/api/users/login';

interface LoginParams {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginParams) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getUser = (token: string): User => {
  const decode = jwtDecode(token);
  return decode as User;
};
