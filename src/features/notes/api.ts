import { createHttpClient } from '@common/utils';
import { ResponseType } from './types';

const request = createHttpClient();

const getNotes = (token: string): ResponseType =>
  request.get({ url: 'notes', headers: { Authorization: token } });

export const api = {
  getNotes,
};
