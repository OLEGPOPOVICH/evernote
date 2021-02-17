import { SagaIterator } from 'redux-saga';
import { all, takeEvery, call, select, put } from 'redux-saga/effects';

import {
  actions,
  api as authApi,
  selectors as authSelectors,
} from '@features/auth';
import { sagas as authSagas } from '@features/auth/sagas';

import { uiMessages } from '@common/messages';

/**
 * Процесс авторизации
 *
 * @returns {void}
 */
function* loginProcess(): Generator {
  const body = yield select(authSelectors.loginData);

  const requestData = yield call(authApi.login, body);

  // Выводим ошибку
  if (!requestData) {
    yield call(
      authSagas.setErrorMessageSaga,
      uiMessages.requestError.incorrectLoginOrPassword,
    );
    return;
  }

  // Завершаем процесс
  yield put(
    actions.authSet({
      isProcessed: false,
    }),
  );
}

/**
 * Вотчер процесса авторизации
 *
 * @returns {void}
 */
export function* loginProcessWatcher(): SagaIterator {
  yield all([takeEvery(actions.login, loginProcess)]);
}
