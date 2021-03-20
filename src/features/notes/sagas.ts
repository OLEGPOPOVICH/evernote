import { logger, pathOr } from '@common/utils';
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

    if (requestData) {
      const notes = pathOr(null, ['data'], requestData);

      yield put(actions.setNotes({ notes }));
    }
  } catch (err) {
    logger(err);
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

    yield call(api.updateNote, id, { views: note.views }, accessToken);

    yield put(actions.setNote({ note }));
  } catch (err) {
    logger(err);
  }
}

export const sagas = {
  getNotes,
  getNote,
};
