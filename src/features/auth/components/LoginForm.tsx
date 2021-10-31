/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
/* eslint-disable valid-jsdoc */
import React, { useCallback, useState } from 'react';
import * as L from '@korus/leda';

import { uiMessages } from '@common/messages';
import { trim } from '@common/utils';

import { LoginData } from '../types';

type LoginFormType = {
  onSubmit: ({ email, password }: LoginData) => void;
  isProcessed: boolean;
  authError: string;
};

/**
 * ## Компонент формы авторизации
 *
 * @param {Function} props.onSubmit Обработчик формы авторизации
 * @param {Boolean} props.isProcessed Состояние процесса авторизации
 * @param {String} props.authError Текст ошибки авторизации
 *
 */
export const LoginForm = ({
  onSubmit,
  isProcessed,
  authError,
}: LoginFormType) => {
  const [email, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitHandler = useCallback((): void => {
    onSubmit({
      email: trim(email),
      password: trim(password),
    });
    setLogin('');
    setPassword('');
  }, [email, password]);

  return (
    <>
      <L.Div className="margin-bottom">
        <L.Label>{uiMessages.labelLogin}</L.Label>
        <L.Input
          className="large"
          form="loginForm"
          name="email"
          value={email}
          onChange={(event: L.InputTypes.ChangeEvent) =>
            setLogin(event.component.value)
          }
          isDisabled={isProcessed}
          isRequired
        />
      </L.Div>
      <L.Div className="margin-bottom">
        <L.Label>{uiMessages.labelPassword}</L.Label>
        <L.Input
          className="large"
          form="loginForm"
          name="password"
          value={password}
          onChange={(event: L.InputTypes.ChangeEvent) =>
            setPassword(event.component.value)
          }
          isDisabled={isProcessed}
          isRequired
        />
      </L.Div>
      <L.Div>
        <L.Button
          className="large width-100 success"
          form="loginForm"
          onClick={submitHandler}
          isDisabled={isProcessed}
        >
          {uiMessages.btnLogin}
        </L.Button>
      </L.Div>
      {authError && (
        <L.Div className="txt-center margin-top">
          <L.Span className="txt-danger">{authError}</L.Span>
        </L.Div>
      )}
    </>
  );
};
