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
import { AxiosPromise } from 'axios';

import {
  actions as authActions,
  selectors as authSelectors,
  sagas as authSagas,
  utils as authUtils,
  api as authApi,
  LoginData as AuthLoginData,
  TokenData as AuthTokenData,
  SessionData as AuthSessionData,
  AccessToken as AuthAccessToken,
} from '@features/auth';

import {
  sagas as navSagas,
  selectors as navSelectors,
} from '@features/navigation';

/**
 * ## Процесс разлогирование
 *
 * @returns {void}
 */
function* logoutFlow(): Generator {
  yield fork(authSagas.logoutSaga);
  yield call(navSagas.navTo, '/auth');
}

/**
 * ## Процесс обработки запроса авторизации
 *
 * @param {AxiosPromise} data -
 *
 * @returns {void}
 */
function* loginProcessHandler(data: AxiosPromise): Generator {
  const sessionData: AuthSessionData = pathOr(null, ['data'], data);
  const accessToken: AuthAccessToken = pathOr('', ['accessToken'], sessionData);

  // Записываем токен в стор
  yield put(authActions.serverData(sessionData));

  // Записываем данные в сессию
  yield call(authSagas.setSessionData, sessionData);

  if (accessToken) {
    // Парсим JWT токен
    const tokenPayload: AuthTokenData = <AuthTokenData>jwtDecode(accessToken);

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
        authActions.authState({
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
 *
 * @returns {void}
 */
function* loginProcess() {
  const data: AuthLoginData = yield select(authSelectors.loginData);

  try {
    const requestData: AxiosPromise = yield call(authApi.login, data);

    yield call(loginProcessHandler, requestData);
  } catch (error) {
    if (error.message === 'Request failed with status code 401') {
      // Выводим ошибку авторизации
      yield call(
        authSagas.setErrorMessageSaga,
        uiMessages.requestError.incorrectLoginOrPassword,
      );
    }
  } finally {
    // Завершаем процесс
    yield put(
      authActions.authState({
        isProcessed: false,
      }),
    );
  }
}

/**
 * ## Процесс авторизации при обновлении страницы или первом запуске сервиса
 *
 * @returns {void}
 */
function* autoLoginProcess() {
  // Получаем данные авторизации из сессии
  const sessionData: string = yield call(authSagas.getSessionData);

  if (!sessionData) {
    yield call(navSagas.navTo, '/auth');
    return;
  }

  const parsedData: AuthSessionData = JSON.parse(sessionData);
  const { accessToken } = parsedData;

  // Записываем токен в стор
  yield put(authActions.serverData(parsedData));

  // Парсим JWT токен
  const tokenPayload: AuthTokenData = <AuthTokenData>jwtDecode(accessToken);

  // Получаем данные о том, закончилась ли время жизни токена, если нет, то сколько ему осталось жить
  const [isLiveToken, delayTime] = authUtils.getTokenExp(tokenPayload);

  // Если токен ещё не просрочен
  if (isLiveToken) {
    yield put(
      authActions.authState({
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
 *
 * @returns {void}
 */
export function* loginProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(authActions.autoLogin, autoLoginProcess),
    takeEvery(authActions.login, loginProcess),
    takeEvery(authActions.logout, logoutFlow),
  ]);
}
