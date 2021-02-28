import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as L from '@korus/leda';

import { uiMessages } from '@common/messages';

import {
  LoginForm as AuthLoginForm,
  actions as authActions,
  LoginData as AuthLoginData,
  selectors as authSelectors,
} from '@features/auth';

/**
 * ## Компонент страницы авторизации
 *
 * @returns {JSX.Element} Компонент страницы авторизации
 */
export const AuthorizationPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { isProcessed } = useSelector(authSelectors.isProcessed);
  const { authError } = useSelector(authSelectors.authError);

  /**
   * ## Обработчик формы авторизации
   *
   * @param {boolean} props.email Email пользователя
   * @param {string} props.password Пароль пользователя
   */
  const formLoginHandler = useCallback(
    ({ email, password }: AuthLoginData): void => {
      dispatch(
        authActions.login({
          email,
          password,
        }),
      );
    },
    [],
  );

  return (
    <L.Div>
      <L.Div className="box width-50 margin-auto padding-large">
        <L.H2 className="txt-center margin-bottom">
          {uiMessages.titleAuthlogin}
        </L.H2>
        <AuthLoginForm
          onSubmit={formLoginHandler}
          isProcessed={isProcessed}
          authError={authError}
        />
      </L.Div>
    </L.Div>
  );
};
