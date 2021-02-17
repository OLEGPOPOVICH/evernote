import React, { useMemo } from 'react';
import * as L from '@korus/leda';
import moment from 'moment';

export const Footer: React.FC = () => {
  const currentYear = useMemo(() => moment().format('YYYY'), []);

  return (
    <L.Div className="wrapper">
      <L.Main className="content-box items margin-y">
        <L.Footer>
          <L.Div className="txt-gray txt-small txt-center">
            <L.Div>{`© EVERNOTE, 2020 — ${currentYear}`}</L.Div>
          </L.Div>
        </L.Footer>
      </L.Main>
    </L.Div>
  );
};
