import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as L from '@korus/leda';

import { LoginForm, LoginData } from '@features/auth/components/LoginForm';
import { actions as authActions } from '@features/auth/ducks';
import { selectors } from '@features/auth';

import { uiMessages } from '@common/messages';

export const Authorization: React.FC = () => {
  const onLogin = useDispatch();
  const { isProcessed } = useSelector(selectors.isProcessed);
  const { authError } = useSelector(selectors.authError);

  // Обработчик формы авторизации
  const formLoginHandler = ({ login, password }: LoginData): void => {
    onLogin(
      authActions.login({
        login,
        password,
      }),
    );
  };

  return (
    <L.Div>
      <L.Div _box _width-50 _margin-auto _padding-large>
        <L.H2 _txt-center>{uiMessages.titleAuthlogin}</L.H2>
        <L.Ul _list _margin-bottom-none>
          <LoginForm
            onSubmit={formLoginHandler}
            isProcessed={isProcessed}
            authError={authError}
          />
        </L.Ul>
      </L.Div>
    </L.Div>
  );
};
