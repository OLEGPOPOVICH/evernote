import { call, put } from 'redux-saga/effects';
import { history } from '@store';

/**
 * Переход по страницам в сагах
 *
 * @param {string} path - путь страницы перехода
 *
 * @returns {void}
 */
function* navTo(path: string): Generator {
  yield put({
    type: '@@router/LOCATION_CHANGE',
    payload: {
      location: {
        pathname: path,
        search: '',
        hash: '#',
      },
      action: 'PUSH',
      isFirstRendering: false,
    },
  });
  yield call(history.push, {
    pathname: path,
    search: '',
    hash: '#',
  });
}

/**
 * @ignore
 */
export const sagas = {
  navTo,
};
