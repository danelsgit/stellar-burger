import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { reducer as authReducer } from './auth';
import { reducer as feedReducer } from './feed';
import { reducer as newOrdersReducer } from './newOrders';
import { reducer as ingredientsReducer } from './ingredients';
import { reducer as constructorReducer } from './constructor';
import { reducer as ordersReducer } from './getOrders';
const rootReducer = combineReducers({
  auth: authReducer,
  feed: feedReducer,
  orders: ordersReducer,
  newOrder: newOrdersReducer,
  ingredients: ingredientsReducer,
  constructor: constructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
