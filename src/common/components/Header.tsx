import React from 'react';
import * as L from '@korus/leda';
import { useSelector } from 'react-redux';

import { selectors as authSelectors } from '@features/auth';
import { HeaderUser } from './HeaderUser';

export const Header: React.FC = () => {
  const { isAuth } = useSelector(authSelectors.isAuth);

  return (
    <L.Header className="user-box personal-box">
      <L.Nav>
        <L.A href="#" className="txt-large txt-bold">
          <L.Img
            src="https://cdn.esphere.ru/images/booking/logo-sber.svg"
            className="margin-right"
          />
          EVERNOTE
        </L.A>
        {isAuth && (
          <L.Ul className="menu-h company txt-right txt-small right">
            <L.Li className="level-1">
              <L.Span className="dropdown-wrapper">
                <L.Div>
                  <HeaderUser />
                </L.Div>
              </L.Span>
            </L.Li>
          </L.Ul>
        )}
      </L.Nav>
    </L.Header>
  );
};
