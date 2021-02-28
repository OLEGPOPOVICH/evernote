import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { logger, pathOr } from '@common/utils';

import { actions as notesActions, api as notesApi } from '@features/notes';

import { selectors as authSelectors } from '@features/auth';

/**
 * Инициализация страницы со списком заметок
 *
 * @returns {void}
 */
function* initNotesPage(): Generator {
  try {
    const { accessToken }: any = yield select(authSelectors.getToken);
    const requestData = yield call(notesApi.getNotes, accessToken);
    const notes = pathOr(null, ['data'], requestData);

    yield put(notesActions.setNotes(notes));
  } catch (err) {
    logger(err);
  }
}

/**
 * Вотчер процесса страницы со списом заметок
 *
 * @returns {void}
 */
export function* notesProcessWatcher(): SagaIterator {
  yield all([takeEvery(notesActions.initNotesPage, initNotesPage)]);
}
