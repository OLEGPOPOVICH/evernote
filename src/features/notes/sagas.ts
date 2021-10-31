import { pathOr } from '@common/utils';
import { AccessToken } from '@features/auth';
import { call, put } from 'redux-saga/effects';
import { api } from './api';
import { actions } from './ducks';
import { ConfigType } from './types';

/**
 * Процесс получения и записи списка заметок в стор
 *
 * @param {AccessToken} accessToken Токен
 * @param {ConfigType} config -
 *
 * @returns {void}
 */
function* getNotes(accessToken: AccessToken, config: ConfigType): Generator {
  try {
    const requestData = yield call(api.getNotes, accessToken, config);
    const notes = pathOr(null, ['data'], requestData);
    const headers = pathOr(null, ['headers'], requestData);

    yield put(
      actions.setTotalCount({ totalCount: Number(headers['x-total-count']) }),
    );
    yield put(actions.setNotes({ notes }));
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Процесс получения и записи заметки в стор
 *
 * @param {string} id id заметки
 * @param {AccessToken} accessToken Токен
 *
 * @returns {void}
 */
function* getNote(id: string, accessToken: AccessToken): Generator {
  try {
    const requestData = yield call(api.getNote, id, accessToken);
    const note = pathOr(null, ['data'], requestData);
    note.views += 1;
    yield put(actions.setNote({ note }));
    yield call(api.updateNote, id, { views: note.views }, accessToken);
  } catch (error) {
    throw new Error(error.message);
  }
}

export const sagas = {
  getNotes,
  getNote,
};
