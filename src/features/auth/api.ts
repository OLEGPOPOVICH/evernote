/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createHttpClient } from '@common/utils';
import { LoginData, AuthData } from './types';

const request = createHttpClient();

/**
 * ## Запрос на авторизацию
 *
 * @param {LoginData} data данные пользователя для авторизации
 *
 * @returns {AxiosPromise} Результат ответа от сервера
 */
const login = (data: LoginData) =>
  request
    .post<AuthData>({
      url: 'auth/login',
      data,
      version: '',
    })
    .then((response) => response.data);

export const api = {
  login,
};
