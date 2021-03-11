import { logger, pathOr } from '@common/utils';
import { AccessToken } from '@features/auth';
import { call, put } from 'redux-saga/effects';
import { api } from './api';
import { actions } from './ducks';

/**
 * Процесс получения и записи списка заметок в стор
 *
 * @param {AccessToken} accessToken Токен
 *
 * @returns {void}
 */
function* getNotes(accessToken: AccessToken): Generator {
  try {
    const requestData = yield call(api.getNotes, accessToken);
    const notes = pathOr(null, ['data'], requestData);

    yield put(actions.setNotes({ notes }));
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
    let requestData = yield call(api.getNote, id, accessToken);
    let note = pathOr(null, ['data'], requestData);

    requestData = yield call(
      api.updateNote,
      id,
      { views: note.views + 1 },
      accessToken,
    );

    note = pathOr(null, ['data'], requestData);

    yield put(actions.setNote({ note }));
  } catch (err) {
    logger(err);
  }
}

export const sagas = {
  getNotes,
  getNote,
};
