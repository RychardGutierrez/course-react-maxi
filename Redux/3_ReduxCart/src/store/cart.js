import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [], totalItems: 0 };

const addCart = (state, item) => {
  let { items } = state;
  const indexItem = items.findIndex((i) => i.id === item.payload.id);
  state.totalItems += 1;
  if (indexItem >= 0) {
    items[indexItem].quantity += 1;

    const quantity = items[indexItem].quantity;
    const price = items[indexItem].price;
    items[indexItem].total = quantity * price;
  } else {
    items.push({ ...item.payload, quantity: 1, total: item.payload.price });
  }
};

const restCart = (state, idItem) => {
  let { items } = state;
  const indexItem = items.findIndex((i) => i.id === idItem.payload.id);
  state.totalItems -= 1;
  if (indexItem >= 0 && items[indexItem].quantity > 1) {
    items[indexItem].quantity -= 1;

    const quantity = items[indexItem].quantity;
    const price = items[indexItem].price;
    items[indexItem].total = quantity * price;
  } else {
    items.splice(indexItem, 1);
  }
};

const cartLegth = (state) => state.items.length;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: { addCart, cartLegth, restCart },
});

export const cartActions = cartSlice.actions;
