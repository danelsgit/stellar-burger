import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { authReducer } from './auth';
import { newOrderReducer } from './newOrder';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './ingredientsConstructor';
import { feedReducer } from './feed';
import { ordersReducer } from './getOrders';

export const rootReducer = combineReducers({
  auth: authReducer,
  feed: feedReducer,
  orders: ordersReducer,
  newOrder: newOrderReducer,
  ingredients: ingredientsReducer,
  ingredientsConstructor: constructorReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
