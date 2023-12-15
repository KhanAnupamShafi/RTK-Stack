import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: undefined, token: undefined };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.id = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
