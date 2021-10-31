/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable valid-jsdoc */
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
import { ErrorLayout, selectors as errorSelectors } from '@features/errors';

/**
 * ## Компонент страницы авторизации
 */
export const AuthorizationPage = () => {
  const dispatch = useDispatch();
  const { isProcessed } = useSelector(authSelectors.isProcessed);
  const { authError } = useSelector(authSelectors.authError);
  const isErrorExist = useSelector(errorSelectors.isErrorExist);

  /**
   * ## Обработчик формы авторизации
   *
   * @param {string} props.email Email пользователя
   * @param {string} props.password Пароль пользователя
   */
  const handleSubmit = useCallback(
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

  if (isErrorExist) {
    return <ErrorLayout />;
  }

  return (
    <L.Div>
      <L.Div className="box width-50 margin-auto padding-large">
        <L.H2 className="txt-center margin-bottom">
          {uiMessages.titleAuthlogin}
        </L.H2>
        <AuthLoginForm
          onSubmit={handleSubmit}
          isProcessed={isProcessed}
          authError={authError}
        />
      </L.Div>
    </L.Div>
  );
};
