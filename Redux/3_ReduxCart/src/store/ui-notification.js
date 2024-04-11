import { createSlice } from '@reduxjs/toolkit';

const initialState = { notification: null };

const showNotification = (state, action) => {
  state.notification = {
    status: action.payload.status,
    title: action.payload.title,
    message: action.payload.message,
  };
};

export const uiNotification = createSlice({
  name: 'notification',
  initialState,
  reducers: { showNotification },
});

export const uiNotificationActions = uiNotification.actions;
