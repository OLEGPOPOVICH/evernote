import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as L from '@korus/leda';

import {
  actions as authActions,
  selectors as authSelectors,
} from '@features/auth';

/**
 * ## Компонент информации в шапке о пользователе
 *
 * @returns {JSX.Element} Компонент информации в шапке о пользователе
 */
export const HeaderUser: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelectors.authUser);

  /**
   * ## Метод получения строки состоящей из имени и Фамилии
   *
   * @returns {string} Строка состоящая из имени и Фамилии
   */
  function getFullName() {
    return `${user.firstName} ${user.lastName}`;
  }

  return (
    <L.Div className="txt-bold header__user">
      <L.Div className="user_img">
        <L.Img src={user.avatar} />
      </L.Div>
      <L.Div>
        <L.Div>{getFullName()}</L.Div>
        <L.Div
          onClick={() => dispatch(authActions.logout())}
          className="btn_logout"
        >
          Выйти
        </L.Div>
      </L.Div>
    </L.Div>
  );
};
