import React, { useCallback, useState } from 'react';
import * as L from '@korus/leda';
import { trim } from 'ramda';

import { uiMessages } from '@common/messages';

export type LoginData = {
  login: string;
  password: string;
};

export type IsProcessed = {
  isProcessed: boolean;
};

export type AuthError = {
  authError: string;
};

type LoginFormProps = {
  onSubmit: ({ login, password }: LoginData) => void;
  isProcessed: boolean;
  authError: string;
};

/**
 * Компонент формы входа
 *
 * @param {Function} props.onSubmit - Обработчик формы авторизации
 * @param {Boolean} props.isProcessed - Состояние процесса авторизации
 * @param {String} props.authError - Текст ошибки авторизации
 *
 * @returns {React.FC} - Компонент формы авторизации
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isProcessed,
  authError,
}: LoginFormProps) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = useCallback(() => {
    onSubmit({
      login: trim(login),
      password: trim(password),
    });
    setLogin('');
    setPassword('');
  }, [login, password]);

  return (
    <>
      <L.Li>
        <L.Label>{uiMessages.labelLogin}</L.Label>
        <L.Input
          form="loginForm"
          name="login"
          value={login}
          onChange={(event) => setLogin(event.component.value)}
          isDisabled={isProcessed}
          isRequired
          _large
        />
      </L.Li>
      <L.Li>
        <L.Label>{uiMessages.labelPassword}</L.Label>
        <L.Input
          form="loginForm"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.component.value)}
          isDisabled={isProcessed}
          isRequired
          _large
        />
      </L.Li>
      <L.Li>
        <L.Button
          form="loginForm"
          onClick={submitHandler}
          isDisabled={isProcessed}
          _success
          _large
          _width-100
          _margin-top
        >
          {uiMessages.btnLogin}
        </L.Button>
      </L.Li>
      {authError && (
        <L.P _txt-center>
          <L.Span _txt-danger>{authError}</L.Span>
        </L.P>
      )}
    </>
  );
};
