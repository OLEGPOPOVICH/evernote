import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { config } from '@common/config';
import {
  LoginData,
  AuthState,
  AuthData,
  AccessToken,
  UserLogin,
} from './types';

const actionAutoLogin = createAction('AUTO_LOGIN');
const actionLogout = createAction('AUTH_LOGOUT');

export type InitialState = {
  email: string;
  password: string;
  isAuth: boolean;
  isProcessed: boolean;
  authError: string;
  authData: {
    accessToken: AccessToken;
    user: UserLogin;
  };
};

const initialState: InitialState = {
  email: '',
  password: '',
  isAuth: false,
  isProcessed: false,
  authError: '',
  authData: {
    accessToken: null,
    user: {
      id: null,
      avatar: '',
      firstName: '',
      lastName: '',
      email: '',
    },
  },
};

// [Экшин] Записать данные пользователя для авторизации в стор
const login = (
  state: InitialState,
  { payload }: PayloadAction<LoginData>,
): InitialState => ({
  ...state,
  ...payload,
  isProcessed: true,
  authError: '',
});

// [Экшин] сброс стора
const toLogout = () => initialState;

// [Экшин] Записать состояние формы авторизации в стор
const setAuthState = (
  state: InitialState,
  { payload }: PayloadAction<AuthState>,
): InitialState => ({
  ...state,
  ...payload,
});

// [Экшин] Записать токен и авторизованного пользователя в стор
const setAuthData = (
  state: InitialState,
  { payload }: PayloadAction<AuthData>,
): InitialState => ({
  ...state,
  authData: payload,
});

const authSlice = createSlice({
  name: config.modules.auth,
  initialState,
  reducers: {
    login,
    toLogout,
    setAuthState,
    setAuthData,
  },
});

export const authReducer = authSlice.reducer;
export const actions = {
  ...authSlice.actions,
  autoLogin: actionAutoLogin,
  logout: actionLogout,
};
