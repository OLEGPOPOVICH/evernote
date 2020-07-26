import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createHashHistory } from 'history';

import { getConfig } from '@common/config';

import { errorsReducer } from '@features/errors';
import { loadingReducer } from '@features/loading';
import { noticeReducer } from '@features/notices';

export const history = createHashHistory();

const rootReducer = combineReducers({
  [getConfig('modules.errors', 'errors')]: errorsReducer,
  [getConfig('modules.loading', 'loading')]: loadingReducer,
  [getConfig('modules.notices', 'notice')]: noticeReducer,
  [getConfig('modules.router', 'router')]: connectRouter(history),
});

export default rootReducer;
