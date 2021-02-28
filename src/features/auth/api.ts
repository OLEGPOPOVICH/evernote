import { createHttpClient } from '@common/utils';
import { LoginData, ResponseType } from './types';

const request = createHttpClient();

const login = (data: LoginData): ResponseType =>
  request.post({ url: 'auth/login', data });

export const api = {
  login,
};
