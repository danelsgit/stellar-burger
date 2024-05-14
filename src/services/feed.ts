import { getFeedsApi, getOrderByNumberApi } from '../utils/burger-api';
import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';

export const getFeed = createAsyncThunk('feed/getFeed', getFeedsApi);
type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedsOrders: (state) => state.orders,
    selectFeeds: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(getFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const feedReducer = feedSlice.reducer;
export const { selectFeedsOrders, selectFeeds } = feedSlice.selectors;
