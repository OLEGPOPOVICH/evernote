import { put } from 'redux-saga/effects';

import { actions } from './ducks';

/**
 *Установить сообщение об ошибке при авторизации или смене пароля
 *
 * @param {string} message - текст ошибки
 *
 * @returns {void}
 */
function* setErrorMessageSaga(message = ''): Generator {
  yield put(
    actions.authSet({
      authError: message,
      isProcessed: false,
    }),
  );
}

export const sagas = {
  setErrorMessageSaga,
};
