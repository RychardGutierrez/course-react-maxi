import { createSlice } from '@reduxjs/toolkit';
import { mock } from '../data';

const initialState = { products: [] };

const loaderProductos = (state) => {
  state.products = mock;
};

export const productoSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: { loaderProductos },
});

export const productActions = productoSlice.actions;
