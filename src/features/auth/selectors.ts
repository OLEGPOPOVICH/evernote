import { createSelector } from '@reduxjs/toolkit';
import { pathOr } from 'ramda';

import { RootState } from '@store';

import { config } from '@common/config';

import {
  AuthError,
  LoginData,
  IsProcessed,
} from '@features/auth/components/LoginForm';
import { InitialState } from '@features/auth/ducks';

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
    login: pathOr('', ['login'], auth),
    password: pathOr('', ['password'], auth),
  }),
);

/**
 * ## [Селектор] Состояние процесса авторизации
 */
const isProcessed = createSelector(
  authSelector,
  (auth: InitialState): IsProcessed => ({
    isProcessed: pathOr(true, ['isProcessed'], auth),
  }),
);

/**
 * ## [Селектор] Текст ошибки авторизации
 */
const authError = createSelector(
  authSelector,
  (auth: InitialState): AuthError => ({
    authError: pathOr('', ['authError'], auth),
  }),
);

export const selectors = {
  loginData,
  isProcessed,
  authError,
};
