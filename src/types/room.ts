import { Message } from './message';

export interface Participant {
    user_id: string;
    socket_path: string;
  }
  
  export interface Room {
    id: string;
    name: string;
    last_message: string;
    last_message_time: string;
    participants: Participant[];
    messageNotification: number;
    messages: Message[];
  }
  
  export interface RoomsState {
    message: string;
    data: {
      limit: number;
      page: number;
      rooms: Room[];
      total: number;
    };
  }