import React from 'react';
import * as L from '@korus/leda';
import { useSelector } from 'react-redux';

import { selectors } from '../selectors';

export const ErrorLayout: React.FC = () => {
  const title = useSelector(selectors.errorTitle);
  const message = useSelector(selectors.errorMessage);
  const code = useSelector(selectors.errorCode);

  return (
    <>
      <L.H1>{title}</L.H1>
      <L.Div className="content-bo txt-center">{`${code} - ${message}`}</L.Div>
    </>
  );
};
