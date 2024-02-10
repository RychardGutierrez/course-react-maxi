import { configureStore } from '@reduxjs/toolkit';
import { modalSlice } from './modal';
import { productoSlice } from './product';
import { cartSlice } from './cart';

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    product: productoSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
