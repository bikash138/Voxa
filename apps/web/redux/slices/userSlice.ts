import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: null | { 
    name: string;
    email: string 
    photo?: string
    rooms?: []
    chats?: []
  };
}

const initialState: UserState = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
