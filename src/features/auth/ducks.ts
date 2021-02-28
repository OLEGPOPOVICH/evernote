import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';

import { LoginData, AuthState, ServerData } from './types';

const AUTO_LOGIN = 'AUTO_LOGIN';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const actionAutoLogin = createAction(AUTO_LOGIN);
const actionLogout = createAction(AUTH_LOGOUT);

export type InitialState = {
  email: string;
  password: string;
  isAuthorizationed: boolean;
  isProcessed: boolean;
  authError: string;
  serverData: ServerData;
};

const initialState: InitialState = {
  email: '',
  password: '',
  isAuthorizationed: false,
  isProcessed: false,
  authError: '',
  serverData: null,
};

/**
 * ## Авторизация
 *
 * @param {InitialState} state - Состояние модуля
 *
 * @returns {void}
 */
const setLogin = (
  state: InitialState,
  { payload }: PayloadAction<LoginData>,
): InitialState => ({
  ...state,
  ...payload,
  isProcessed: true,
  authError: '',
});

/**
 * ## Установка состояния формы авторизации
 *
 * @param {InitialState} state - Состояние модуля
 *
 * @returns {void}
 */
const setAuthState = (
  state: InitialState,
  { payload }: PayloadAction<AuthState>,
): InitialState => ({
  ...state,
  ...payload,
});

/**
 * ##
 *
 * @param {InitialState} state - Состояние модуля
 *
 * @returns {void}
 */
const setServerData = (
  state: InitialState,
  { payload }: PayloadAction<ServerData>,
): InitialState => ({
  ...state,
  ...{ serverData: payload },
});

const loginSlice = createSlice({
  name: config.modules.auth,
  initialState,
  reducers: {
    login: setLogin,
    authState: setAuthState,
    serverData: setServerData,
  },
});

export const authReducer = loginSlice.reducer;
export const actions = {
  ...loginSlice.actions,
  autoLogin: actionAutoLogin,
  logout: actionLogout,
};
