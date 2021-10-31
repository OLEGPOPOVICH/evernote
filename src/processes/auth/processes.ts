/* eslint-disable valid-jsdoc */
import { SagaIterator } from 'redux-saga';
import {
  all,
  takeEvery,
  call,
  select,
  put,
  delay,
  fork,
} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';

import { pathOr } from '@common/utils';
import { uiMessages } from '@common/messages';

import {
  actions as authActions,
  selectors as authSelectors,
  sagas as authSagas,
  utils as authUtils,
  api as authApi,
  TokenData as AuthTokenData,
  AuthData,
} from '@features/auth';

import {
  sagas as navSagas,
  selectors as navSelectors,
} from '@features/navigation';

import { actions as errorActions } from '@features/errors';

/**
 * ## Процесс разлогирование
 */
function* logoutFlow(): Generator {
  yield fork(authSagas.logoutSaga);
  yield call(navSagas.navTo, '/auth');
}

/**
 * ## Процесс обработки запроса авторизации
 */
function* loginProcessHandler(data: AuthData): Generator {
  const accessToken = pathOr('', ['accessToken'], data);

  // Записываем токен и данные пользователя в стор
  yield put(authActions.setAuthData(data));

  // Записываем данные в сессию
  yield call(authSagas.setSessionData, data);

  if (accessToken) {
    // Парсим JWT токен
    const tokenPayload = <AuthTokenData>jwtDecode(accessToken);

    /*
     * Получаем данные о том, закончилась ли время жизни токена
     * и если нет, то сколько ему осталось жить
     */
    const [isLiveToken, delayTime] = authUtils.getTokenExp(tokenPayload);

    // Если токен ещё не просрочен
    if (isLiveToken) {
      // Редирект на страницу с заметками
      yield call(navSagas.navTo, '/notes');

      // Завершаем процесс
      yield put(
        authActions.setAuthState({
          password: '',
          isProcessed: false,
          isAuth: true,
        }),
      );
      // Ждем когда токен истечет
      yield delay(delayTime);
    }

    // Разлогиниваемся
    yield call(logoutFlow);
  }
}

/**
 * ## Процесс авторизации
 */
function* loginProcess() {
  try {
    const loginData = yield select(authSelectors.loginData);
    const requestData = yield call(authApi.login, loginData);

    if (requestData.status === 'ok') {
      yield call(loginProcessHandler, requestData.data);
    }

    if (requestData.status === 'error') {
      yield call(authSagas.setErrorMessageSaga, requestData.message);
    }
  } catch (error) {
    yield put(errorActions.setError(uiMessages.serverError(503)));
  } finally {
    // Завершаем процесс
    yield put(
      authActions.setAuthState({
        isProcessed: false,
      }),
    );
  }
}

/**
 * ## Процесс авторизации при обновлении страницы или первом запуске сервиса
 */
function* autoLoginProcess() {
  // Получаем данные авторизации из сессии
  const sessionData = yield call(authSagas.getSessionData);

  if (!sessionData) {
    yield call(navSagas.navTo, '/auth');
    return;
  }

  const parsedData = JSON.parse(sessionData);
  const { accessToken } = parsedData;

  // Записываем токен в стор
  yield put(authActions.setAuthData(parsedData));

  // Парсим JWT токен
  const tokenPayload = <AuthTokenData>jwtDecode(accessToken);

  // Получаем данные о том, закончилась ли время жизни токена, если нет, то сколько ему осталось жить
  const [isLiveToken, delayTime] = authUtils.getTokenExp(tokenPayload);

  // Если токен ещё не просрочен
  if (isLiveToken) {
    yield put(
      authActions.setAuthState({
        isAuth: true,
      }),
    );

    // Получаем информацию о том, на какой мы странице
    const currentPathName = yield select(navSelectors.pathName);

    if (currentPathName === '/auth') {
      yield call(navSagas.navTo, '/');
    }

    yield delay(delayTime);
  }

  // Раздлогтрование
  yield call(logoutFlow);
}

/**
 * ## Вотчер процесса авторизации
 */
export function* loginProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(authActions.autoLogin, autoLoginProcess),
    takeEvery(authActions.login, loginProcess),
    takeEvery(authActions.logout, logoutFlow),
  ]);
}
