import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
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

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementReducer,
    decrementReducer,
    increaseReducer,
    toggleReducer,
  },
});

//const store = configureStore({ reducer: { counter: counterSlice.reducer } });
const store = configureStore({ reducer: counterSlice.reducer });

export const counterActions = counterSlice.actions;

export default store;
