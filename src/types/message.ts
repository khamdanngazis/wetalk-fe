import { Participant } from "./room";

export type MessageStatus = "1" | "2" | "3" | null;

export interface Message {
  id: string;
  type: "incoming" | "outgoing";
  text: string;
  time: string;
  status: MessageStatus;
}

export interface MessageState {
    message: string;
    data: {
      limit: number;
      page: number;
      messages: Message[];
      total: number;
    };
  }

export  interface MessageSocket {
    id: string;
    sender_id: string;
    chat_room_id: string;
    receiver_id: string;
    content: string;
    timestamp: string;
    status?: number; // Optional status field for message delivery
    participants: Participant[];
}