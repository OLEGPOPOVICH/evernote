import { createHttpClient } from '@common/utils';
import { AccessToken as AuthAccessToken } from '@features/auth';
import { AxiosPromise } from 'axios';
import { NoteItemType } from './types';

const request = createHttpClient();

/**
 * ## Получить список заметок
 *
 * @param {AuthAccessToken} token Токен
 *
 * @returns {AxiosPromise} Результат ответа от сервера
 */
const getNotes = (token: AuthAccessToken): AxiosPromise =>
  request.get({ url: 'notes', headers: { Authorization: token }, version: '' });

/**
 * ## Получить заметку
 *
 * @param {string} id id заметки
 * @param {AuthAccessToken} token Токен
 *
 * @returns {AxiosPromise} Результат ответа от сервера
 */
const getNote = (id: string, token: AuthAccessToken): AxiosPromise =>
  request.get({
    url: `notes/${id}`,
    headers: { Authorization: token },
    version: '',
  });

/**
 * ## Обновить заметку
 *
 * @param {string} id id заметки
 * @param {NoteItemType} data Обновляемое свойство заметки
 * @param {AuthAccessToken} token Токен
 *
 * @returns {AxiosPromise} Результат ответа от сервера
 */
const updateNote = (
  id: string,
  data: NoteItemType,
  token: AuthAccessToken,
): AxiosPromise =>
  request.patch({
    url: `notes/${id}`,
    data,
    headers: { Authorization: token },
    version: '',
  });

export const api = {
  getNotes,
  getNote,
  updateNote,
};
