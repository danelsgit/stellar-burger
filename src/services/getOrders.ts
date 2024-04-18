import { getOrdersApi } from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';

export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

type TOrderState = {
  orders: TOrder[];
};

const initialState: TOrderState = {
  orders: []
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const ordersReducer = ordersSlice.reducer;

export const { selectOrders } = ordersSlice.selectors;
