import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { logger, split } from '@common/utils';

import { actions as notesActions, sagas as notesSagas } from '@features/notes';

import { actions as authActions, sagas as authSagas } from '@features/auth';
import { selectors as navSelectors } from '@features/navigation';

/**
 * Проверка прав доступа
 *
 * @returns {void}
 */
function* checkAccessRights(): Generator {
  yield;
}

/**
 * Инициализация страницы со списком заметок
 *
 * @returns {void}
 */
function* loadingNotesPage() {
  try {
    const sessionData: string = yield call(authSagas.getSessionData);

    if (sessionData) {
      yield call(checkAccessRights);

      const { accessToken } = JSON.parse(sessionData);

      yield call(notesSagas.getNotes, accessToken);
    } else {
      yield put(authActions.logout());

      // скинуть стор
    }
  } catch (err) {
    logger(err);
  }
}

/**
 * Инициализация детальной страницы списка заметок
 *
 * @returns {void}
 */
function* loadingNoteDetailPage() {
  try {
    const serverData: string = yield call(authSagas.getSessionData);

    if (serverData) {
      yield call(checkAccessRights);

      const { accessToken } = JSON.parse(serverData);
      const pathName: string = yield select(navSelectors.pathName);
      const pathNameArray = split(pathName, '/');
      const idNote = pathNameArray[pathNameArray.length - 1];

      yield call(notesSagas.getNote, idNote, accessToken);
    } else {
      yield put(authActions.logout());

      // скинуть стор
    }
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
  yield all([
    takeEvery(notesActions.loadingNotesPage, loadingNotesPage),
    takeEvery(notesActions.loadingNoteDetailPage, loadingNoteDetailPage),
  ]);
}
