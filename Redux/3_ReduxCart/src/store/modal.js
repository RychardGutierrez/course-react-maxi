import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggle: false,
};

const toggleModal = (state) => {
  state.toggle = !state.toggle;
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: { toggleModal },
});

export const modalActions = modalSlice.actions;
