import { createHttpClient } from '@common/utils';
import { AxiosPromise } from 'axios';
import { LoginData } from './types';

const request = createHttpClient();

/**
 * ## Запрос на авторизацию
 *
 * @param {LoginData} data данные пользователя для авторизации
 *
 * @returns {AxiosPromise} Результат ответа от сервера
 */
const login = (data: LoginData): AxiosPromise =>
  request.post({ url: 'auth/login', data, version: '' });

export const api = {
  login,
};
