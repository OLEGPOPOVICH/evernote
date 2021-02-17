import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { LoginData } from './components/LoginForm';

const initialState = {
  login: '',
  password: '',
  isAuthorizationed: false,
  isProcessed: false,
  authError: '',
};

export type InitialState = typeof initialState;
export type AuthState = {
  isAuthorizationed?: boolean;
  isProcessed?: boolean;
  authError?: string;
};

// Авторизация
const toLogin = (
  state: InitialState,
  { payload }: PayloadAction<LoginData>,
): InitialState => ({
  ...state,
  ...payload,
  isProcessed: true,
  authError: '',
});

// Установка состояния стора
const toAuthSet = (
  state: InitialState,
  { payload }: PayloadAction<AuthState>,
): InitialState => ({
  ...state,
  ...payload,
});

const loginSlice = createSlice({
  name: config.modules.auth,
  initialState,
  reducers: {
    login: toLogin,
    authSet: toAuthSet,
  },
});

export const authReducer = loginSlice.reducer;

export const actions = {
  ...loginSlice.actions,
};
