import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { LoginData, AuthState, SessionData } from './types';

const AUTO_LOGIN = 'AUTO_LOGIN';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const actionAutoLogin = createAction(AUTO_LOGIN);
const actionLogout = createAction(AUTH_LOGOUT);

export type InitialState = {
  email: string;
  password: string;
  isAuth: boolean;
  isProcessed: boolean;
  authError: string;
  serverData: SessionData;
};

const initialState: InitialState = {
  email: '',
  password: '',
  isAuth: false,
  isProcessed: false,
  authError: '',
  serverData: null,
};

/**
 * ## [Экшин] Записать данные пользователя для авторизации в стор
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
 * ## [Экшин] Записать состояние формы авторизации в стор
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
 * ## [Экшин] Записать токен и авторизованного пользователя в стор
 *
 * @param {InitialState} state - Состояние модуля
 *
 * @returns {void}
 */
const setAuthData = (
  state: InitialState,
  { payload }: PayloadAction<SessionData>,
): InitialState => ({
  ...state,
  ...{ serverData: payload },
});

/**
 * ## [Экшин] сброс стора
 *
 * @returns {void}
 */

const setInitialStore = () => initialState;

const loginSlice = createSlice({
  name: config.modules.auth,
  initialState,
  reducers: {
    login: setLogin,
    authState: setAuthState,
    serverData: setAuthData,
    setInitialStore,
  },
});

export const authReducer = loginSlice.reducer;
export const actions = {
  ...loginSlice.actions,
  autoLogin: actionAutoLogin,
  logout: actionLogout,
};
