import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
};

const loginReducer = (state) => {
  state.isAuthenticated = true;
};

const logoutReducer = (state) => {
  state.isAuthenticated = false;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    loginReducer,
    logoutReducer,
  },
});

export const authActions = authSlice.actions;
