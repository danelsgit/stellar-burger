import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  logoutApi,
  TRegisterData,
  updateUserApi
} from '../utils/burger-api';
import { TUser } from '../utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

export const register = createAsyncThunk('user/register', registerUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);
export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const login = createAsyncThunk('user/login', loginUserApi);
export const updateUser = createAsyncThunk('auth/updateUser', updateUserApi);

type TUserState = {
  user: TUser;
  isAuth: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: {
    email: '',
    name: ''
  },
  isAuth: false,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuth: (state) => state.isAuth,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка регистрации';
      });
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isAuth = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка входа';
      });
    builder.addCase(logout.fulfilled, (state) => (state = initialState));
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isAuth = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка получения пользователя';
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка обновления пользователя';
      });
  }
});

export const authReducer = authSlice.reducer;
export const { selectUser, selectIsAuth, selectError } = authSlice.selectors;
