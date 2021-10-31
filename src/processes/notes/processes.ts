/* eslint-disable no-underscore-dangle */
import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { logger, split } from '@common/utils';

import {
  actions as notesActions,
  sagas as notesSagas,
  selectors as notesSelectors,
} from '@features/notes';

import { actions as authActions, sagas as authSagas } from '@features/auth';
import { selectors as navSelectors } from '@features/navigation';

/**
 * Установка активного тега
 *
 * @returns {void}
 */
function* setActiveTag() {
  const params = yield select(navSelectors.queryParams);

  if (params.tags_like) {
    yield put(notesActions.setActiveTag({ activeTag: params.tags_like }));
  } else {
    yield put(notesActions.setActiveTag({ activeTag: '' }));
  }
}

/**
 * Инициализация страницы со списком заметок
 *
 * @returns {void}
 */
function* loadingNotesPage() {
  try {
    // Проверка прав доступа пользователя
    yield call(authSagas.checkAuthAccess);

    // Получаем заголовки для запроса
    const sessionData = yield call(authSagas.getSessionData);
    const { accessToken } = JSON.parse(sessionData);

    const { currentPage } = yield select(notesSelectors.getCurrentPage);
    const { pageLimit } = yield select(notesSelectors.getPageLimit);

    const params = yield select(navSelectors.queryParams);
    params._page = currentPage;
    params._limit = pageLimit;

    const config = {
      params,
    };

    yield call(setActiveTag);

    yield call(notesSagas.getNotes, accessToken, config);
  } catch (error) {
    logger(error);

    if (error.message === 'Request failed with status code 401') {
      yield put(authActions.toLogout());
    }
  }
}

/**
 * Инициализация детальной страницы списка заметок
 *
 * @returns {void}
 */
function* loadingNoteDetailPage() {
  try {
    // Проверка прав доступа пользователя
    yield call(authSagas.checkAuthAccess);

    // Получаем заголовки для запроса
    const sessionData = yield call(authSagas.getSessionData);

    const { accessToken } = JSON.parse(sessionData);
    const pathName: string = yield select(navSelectors.pathName);
    const pathNameArray = split(pathName, '/');
    const idNote = pathNameArray[pathNameArray.length - 1];

    yield call(setActiveTag);

    yield call(notesSagas.getNote, idNote, accessToken);
  } catch (error) {
    logger(error);

    if (error.message === 'Request failed with status code 401') {
      yield put(authActions.toLogout());
    }
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
