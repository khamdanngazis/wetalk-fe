// src/store/slices/selectedRoomSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../../types/room';

interface SelectedRoomState {
  selectedRoom: Room | null;
}

const initialState: SelectedRoomState = {
  selectedRoom: null,
};


const selectedRoomSlice = createSlice({
  name: 'selectedRoom',
  initialState,
  reducers: {
    selectRoom(state, action: PayloadAction<Room>) {
      state.selectedRoom = action.payload;
    },
  },
});

export const { selectRoom } = selectedRoomSlice.actions;

export default selectedRoomSlice.reducer;