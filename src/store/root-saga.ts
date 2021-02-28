import { SagaIterator } from 'redux-saga';
import { call, all, fork } from 'redux-saga/effects';

import { initProcessWatcher } from '@processes/init';
import { loginProcessWatcher } from '@src/processes/auth';
import { notesProcessWatcher } from '@src/processes/notes';

/**
 * Главная сага - точка входа
 *
 * @returns {void}
 */
export function* rootSaga(): SagaIterator {
  // eslint-disable-next-line no-console
  yield call(console.log, 'Root Saga Runner...!');

  yield all(
    [initProcessWatcher, loginProcessWatcher, notesProcessWatcher].map(fork),
  );
}
