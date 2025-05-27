import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      return action.payload;
    },
    clearCurrentUser: () => {
      return null;
    },
  },
});
