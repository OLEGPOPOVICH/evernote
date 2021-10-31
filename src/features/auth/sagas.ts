import { apply, call, fork, put } from 'redux-saga/effects';

import { actions } from './ducks';
import { AuthData } from './types';

/**
 * ## Процесс установки сообщения об ошибке при авторизации
 *
 * @param {string} message - текст ошибки
 *
 * @returns {void}
 */
function* setErrorMessageSaga(message = ''): Generator {
  yield put(
    actions.setAuthState({
      authError: message,
      isProcessed: false,
    }),
  );
}

/**
 * ## Процесс записи данных авторизации в сессию
 *
 * @param {AuthData} data Инфа о токене и пользователе
 *
 * @returns {void}
 */
function* setSessionData(data: AuthData): Generator {
  yield apply(sessionStorage, sessionStorage.setItem, [
    'authData',
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
    'authData',
  ]);

  return sessionData;
}

/**
 * ## Процесс удаления данных авторизации из сессии
 *
 * @returns {void}
 */
function* clearSessionData(): Generator {
  yield apply(sessionStorage, sessionStorage.removeItem, ['authData']);
}

/**
 * ## Процесс проверки прав доступа к ресурсу
 *
 * @returns {void}
 */
function* checkAuthAccess(): Generator {
  // Получаем данные о токене
  const sessionData = yield call(getSessionData);

  // Если данных о сессии нет
  if (!sessionData) {
    throw new Error('Request failed with status code 401');
  }
}

/**
 * ## Процесс разлогирования
 *
 * @returns {void}
 */
function* logoutSaga(): Generator {
  const sessionData = yield call(getSessionData);

  if (sessionData) {
    yield fork(clearSessionData);
  }

  yield put(actions.toLogout());
}

export const sagas = {
  setErrorMessageSaga,
  setSessionData,
  getSessionData,
  logoutSaga,
  checkAuthAccess,
};
