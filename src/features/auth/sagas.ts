import { apply, call, fork, put } from 'redux-saga/effects';

import { actions } from './ducks';
import { SessionData } from './types';

/**
 * ## Процесс установки сообщения об ошибке при авторизации
 *
 * @param {string} message - текст ошибки
 *
 * @returns {void}
 */
function* setErrorMessageSaga(message = ''): Generator {
  yield put(
    actions.authState({
      authError: message,
      isProcessed: false,
    }),
  );
}

/**
 * ## Процесс записи данных авторизации в сессию
 *
 * @param {SessionData} data Инфа о токене и пользователе
 *
 * @returns {void}
 */
function* setSessionData(data: SessionData): Generator {
  yield apply(sessionStorage, sessionStorage.setItem, [
    'sessionData',
    JSON.stringify(data),
  ]);
}

/**
 * ## Процесс получения данных авторизации из сессии
 *
 * @returns {SessionData} -
 */
function* getSessionData(): Generator {
  const sessionData = yield apply(sessionStorage, sessionStorage.getItem, [
    'sessionData',
  ]);

  return sessionData;
}

/**
 * ## Процесс удаления данных авторизации из сессии
 *
 * @returns {void}
 */
function* clearSessionData(): Generator {
  yield apply(sessionStorage, sessionStorage.removeItem, ['sessionData']);
}

/**
 * ## Процесс проверки прав доступа к ресурсу
 *
 * @returns {void}
 */
function* checkAuthAccess(): Generator {
  // Получаем данные о токене
  const sessionData = yield call(getSessionData);

  /*
   * TODO
   * Если данных о сессии нет
   */
  if (!sessionData) {
    throw new Error('Error');
  }
}

/**
 * ## Процесс разлогирования
 *
 * @returns {void}
 */
function* logoutSaga(): Generator {
  const sessionData: SessionData = yield call(getSessionData);

  if (sessionData) {
    yield fork(clearSessionData);
  }

  yield put(actions.setInitialStore());
}

export const sagas = {
  setErrorMessageSaga,
  setSessionData,
  getSessionData,
  logoutSaga,
  checkAuthAccess,
};
