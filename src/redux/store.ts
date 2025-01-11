import { configureStore } from '@reduxjs/toolkit';
import roomsSlice from './slices/chatRoomSlice';
import selectedRoomSlice from './slices/chatRoomSelected';

const store = configureStore({
  reducer: {
    rooms: roomsSlice,
    selectedRoom: selectedRoomSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;