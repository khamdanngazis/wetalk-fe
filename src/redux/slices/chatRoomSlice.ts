// src/redux/slices/roomsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RoomsState } from "../../types/room";
import getRooms from "../../services/chat.room.service";

interface FetchRoomsParams {
  limit: number;
  page: number;
  token: string;
}

const initialState: RoomsState = {
  message: "",
  data: {
    limit: 10,
    page: 1,
    rooms: [],
    total: 0,
  },
};

export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async ({ limit, page, token }: FetchRoomsParams, thunkAPI) => {
    try {
      const data = await getRooms(limit, page, token);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addRoom(state, action) {
      state.data.rooms.push(action.payload);
    },
    updateRoom(state, action) {
      const index = state.data.rooms.findIndex(
        (room) => room.id === action.payload.id
      );
      if (index !== -1) {
        state.data.rooms[index] = action.payload;
      }
    },
    removeRoom(state, action) {
      state.data.rooms = state.data.rooms.filter(
        (room) => room.id !== action.payload
      );
    },
    setMessages(state, action) {
      const { roomId, messages } = action.payload;
      const room = state.data.rooms.find((room) => room.id === roomId);
      if (room) {
        const lastMessage = messages[messages.length - 1];
        room.last_message_time = lastMessage.time;
        room.last_message = lastMessage.text;
        room.messages = messages;
      }
    },
    addMessage(state, action) {
      const { roomId, message } = action.payload;
      const room = state.data.rooms.find((room) => room.id === roomId);
      if (room) {
        console.log("add message", message);
        room.messages.push(message);
        room.last_message = message.text;
        room.last_message_time = message.time;
      }
    },
    updateMessage(state, action) {
      const { roomId, messageId, updatedMessage } = action.payload;
      const room = state.data.rooms.find((room) => room.id === roomId);
      if (room) {
        const messageIndex = room.messages.findIndex((msg) => msg.id === messageId);
        if (messageIndex !== -1) {
          // Instead of mutating the message directly, create a new message object
          room.messages[messageIndex] = {
            ...room.messages[messageIndex], // Preserve existing message properties
            ...updatedMessage, // Apply updated properties (status, content, etc.)
          };
        }
      }
    },
    clearMessageNotification(state, action) {
      const { roomId } = action.payload;
      const room = state.data.rooms.find((room) => room.id === roomId);
      if (room) {
        room.messageNotification = 0;
      }
    },
    addNotification(state, action) {
      const { roomId } = action.payload;
      const room = state.data.rooms.find((room) => room.id === roomId);
      if (room) {
        if (isNaN(room.messageNotification)) {
          room.messageNotification = 0; // Set to 0 if it's not a number
        }
        room.messageNotification += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.message = "Loading...";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.message = "Success";
        state.data = action.payload.data;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.message = `Error: ${action.payload}`;
      });
  },
});

export const {
  addRoom,
  updateRoom,
  removeRoom,
  setMessages,
  addMessage,
  updateMessage,
  clearMessageNotification,
  addNotification,
} = roomsSlice.actions;

export default roomsSlice.reducer;
