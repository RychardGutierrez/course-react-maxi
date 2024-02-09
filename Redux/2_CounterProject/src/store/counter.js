import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = {
  counter: 0,
  showCounter: true,
};

const incrementReducer = (state) => {
  console.log(state.counter);
  state.counter++;
};

const decrementReducer = (state) => {
  state.counter--;
};

const increaseReducer = (state, action) => {
  console.log(action);
  state.counter += action.payload.number;
};

const toggleReducer = (state) => {
  state.showCounter = !state.showCounter;
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    incrementReducer,
    decrementReducer,
    increaseReducer,
    toggleReducer,
  },
});

export const counterActions = counterSlice.actions;
