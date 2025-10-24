import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '@/app/interfaces/user';

interface UserState {
  data: User | null;
}

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    clerUserLogOut: (state) => {
      state.data = null;
    },
  },
});
export const { setUserData, clerUserLogOut } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
