import { orderBurgerApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const newOrder = createAsyncThunk('newOrder/post', orderBurgerApi);

type TNewOrderState = {
  orderRequest: boolean;
  order: null | TOrder;
  name: string;
};

const initialState: TNewOrderState = {
  orderRequest: false,
  order: null,
  name: ''
};

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: (state) => (state = initialState)
  },
  selectors: {
    selectNewOrders: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.orderRequest = false;
        state.name = action.payload.name;
      })
      .addCase(newOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(newOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { clearOrder } = newOrderSlice.actions;
export const reducer = newOrderSlice.reducer;
export const { selectNewOrders } = newOrderSlice.selectors;
