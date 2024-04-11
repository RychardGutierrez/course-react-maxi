import { configureStore } from '@reduxjs/toolkit';
import { modalSlice } from './modal';
import { productoSlice } from './product';
import { cartSlice } from './cart';
import { uiNotification } from './ui-notification';

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    product: productoSlice.reducer,
    cart: cartSlice.reducer,
    notification: uiNotification.reducer,
  },
});

export default store;
