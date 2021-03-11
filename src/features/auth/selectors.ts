import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { config } from '@common/config';
import { pathOr } from '@common/utils';

import { InitialState } from './ducks';
import { LoginData, AuthState, SessionDataUser, SessionData } from './types';

/**
 * ## [Селектор] Получить данные по авторизации
 */
const authSelector = (state: RootState): InitialState =>
  state[config.modules.auth];

/**
 * ## [Селектор] Получить данные о логине и пароле
 */
const loginData = createSelector(
  authSelector,
  (auth: InitialState): LoginData => ({
    email: pathOr('', ['email'], auth),
    password: pathOr('', ['password'], auth),
  }),
);

/**
 * ## [Селектор] Получить состояние процесса авторизации
 */
const isProcessed = createSelector(
  authSelector,
  (auth: InitialState): AuthState => ({
    isProcessed: pathOr(false, ['isProcessed'], auth),
  }),
);

/**
 * ## [Селектор] Получить состояние авторизации
 */
const isAuth = createSelector(
  authSelector,
  (auth: InitialState): AuthState => ({
    isAuth: pathOr(false, ['isAuth'], auth),
  }),
);

/**
 * ## [Селектор] Получить текст ошибки авторизации
 */
const authError = createSelector(
  authSelector,
  (auth: InitialState): AuthState => ({
    authError: pathOr('', ['authError'], auth),
  }),
);

/**
 * ## [Селектор] Авторизованный пользователь
 */
const authUser = createSelector(
  authSelector,
  (auth: InitialState): SessionDataUser => ({
    user: pathOr({}, ['serverData', 'user'], auth),
  }),
);

/**
 * ## [Селектор] Получения токена
 */
const getToken = createSelector(
  authSelector,
  (auth: InitialState): SessionData => ({
    accessToken: pathOr(null, ['serverData', 'accessToken'], auth),
  }),
);

export const selectors = {
  loginData,
  isProcessed,
  authError,
  isAuth,
  authUser,
  getToken,
};
