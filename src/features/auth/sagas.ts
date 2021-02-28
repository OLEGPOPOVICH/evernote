import { apply, call, fork, put } from 'redux-saga/effects';

import { actions } from './ducks';
import { ServerData } from './types';

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
 * @param {ServerData} data Инфа о токене и пользователе
 *
 * @returns {void}
 */
function* setSessionData(data: ServerData): Generator {
  yield apply(sessionStorage, sessionStorage.setItem, [
    'serverData',
    JSON.stringify(data),
  ]);
}

/**
 * ## Процесс получения данных авторизации из сессии
 *
 * @returns {void}
 */
function* getSessionData(): Generator {
  const sessionData: any = yield apply(sessionStorage, sessionStorage.getItem, [
    'serverData',
  ]);
  /* TODO - как правильно написать тип/как задать возвращающийся тип */
  return sessionData;
}

/**
 * ## Процесс удаления данных авторизации из сессии
 *
 * @returns {void}
 */
function* clearSessionData(): Generator {
  yield apply(sessionStorage, sessionStorage.removeItem, ['serverData']);
}

/**
 * ## Процесс разлогирования
 *
 * @returns {void}
 */
function* logoutSaga(): Generator {
  let sessionData: string | any = yield call(getSessionData);

  if (sessionData) {
    yield fork(clearSessionData);
  }

  yield put(
    actions.authState({
      isAuthorizationed: false,
    }),
  );

  yield put(actions.serverData((sessionData = null)));
}

export const sagas = {
  setErrorMessageSaga,
  setSessionData,
  getSessionData,
  logoutSaga,
};
