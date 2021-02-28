import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { config } from '@common/config';
import { pathOr } from '@common/utils';

import { InitialState } from './ducks';
import { LoginData, AuthState, ServerDataUser } from './types';

/**
 * ## [Селектор] Данные по auth
 */
const authSelector = (state: RootState): InitialState =>
  state[config.modules.auth];

/**
 * ## [Селектор] Данные о логине и пароле
 */
const loginData = createSelector(
  authSelector,
  (auth: InitialState): LoginData => ({
    email: pathOr('', ['email'], auth),
    password: pathOr('', ['password'], auth),
  }),
);

/**
 * ## [Селектор] Состояние процесса авторизации
 */
const isProcessed = createSelector(
  authSelector,
  (auth: InitialState): AuthState => ({
    isProcessed: pathOr(false, ['isProcessed'], auth),
  }),
);

/**
 * ## [Селектор] Состояние авторизации
 */
const isAuthorizationed = createSelector(
  authSelector,
  (auth: InitialState): AuthState => ({
    isAuthorizationed: pathOr(false, ['isAuthorizationed'], auth),
  }),
);

/**
 * ## [Селектор] Текст ошибки авторизации
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
  (auth: InitialState): ServerDataUser => ({
    user: pathOr({}, ['serverData', 'user'], auth),
  }),
);

/**
 * ## [Селектор] Получения токена
 */
const getToken = createSelector(authSelector, (auth: InitialState): any => ({
  accessToken: pathOr(null, ['serverData', 'accessToken'], auth),
}));

export const selectors = {
  loginData,
  isProcessed,
  authError,
  isAuthorizationed,
  authUser,
  getToken,
};
