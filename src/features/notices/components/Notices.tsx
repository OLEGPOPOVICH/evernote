import React from 'react';
import * as L from '@korus/leda';
import { useDispatch, useSelector } from 'react-redux';

import { selectors } from '../selectors';
import { actions } from '../ducks';

export const Notices = () => {
  const notices = useSelector(selectors.notices);
  const dispatch = useDispatch();

  return (
    <L.Notifications
      value={notices}
      onChange={() => dispatch(actions.clearNotices())}
    />
  );
};
