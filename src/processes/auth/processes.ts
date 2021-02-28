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
  LoginData as AuthLoginData,
  TokenData as AuthTokenData,
  ServerData as AuthServerData,
  AccessToken as AuthAccessToken,
  ResponseType as AuthResponseType,
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
 * @param {object | any} data -
 *
 * @returns {void}
 */
function* loginProcessHandler(data: AuthResponseType): Generator {
  const serverData: AuthServerData = pathOr(null, ['data'], data);
  const accessToken: AuthAccessToken = pathOr('', ['accessToken'], serverData);

  // Записываем токен в стор
  yield put(authActions.serverData(serverData));

  // Записываем данные в сессию
  yield call(authSagas.setSessionData, serverData);

  if (accessToken) {
    // Парсим JWT токен
    const tokenPayload: AuthTokenData | any = yield call(
      jwtDecode,
      accessToken,
    );

    /*
     * Получаем данные о том, закончилась ли время жизни токена
     * и если нет, то сколько ему осталось жить
     */
    const [isLiveToken, delayTime] = authUtils.getTokenExp(tokenPayload);

    // Если токен ещё не просрочен
    if (isLiveToken) {
      // Редирект на главную страницу
      yield call(navSagas.navTo, '/');

      // Завершаем процесс
      yield put(
        authActions.authState({
          isProcessed: false,
          isAuthorizationed: true,
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
function* loginProcess(): Generator {
  /* TODO Как тправильно написать тип */
  const user: AuthLoginData | any = yield select(authSelectors.loginData);

  try {
    /* TODO - как правильно писать тип для ответа запроса */
    const requestData: AuthResponseType = yield call(authApi.login, user);

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
function* autoLoginProcess(): Generator {
  // Получаем данные авторизации из сессии
  const sessionData: string | any = yield call(authSagas.getSessionData);

  if (!sessionData) {
    yield call(navSagas.navTo, '/auth');
    return;
  }

  const parsedData: AuthServerData = JSON.parse(sessionData);
  const accessToken: AuthAccessToken = pathOr('', ['accessToken'], parsedData);

  // Записываем токен в стор
  yield put(authActions.serverData(parsedData));

  // Парсим JWT токен
  const tokenPayload: AuthTokenData | any = yield call(jwtDecode, accessToken);

  /*
   * Получаем данные о том, закончилась ли время жизни токена
   * и если нет, то сколько ему осталось жить
   */
  const [isLiveToken, delayTime] = authUtils.getTokenExp(tokenPayload);

  // Если токен ещё не просрочен
  if (isLiveToken) {
    yield put(
      authActions.authState({
        isAuthorizationed: true,
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
