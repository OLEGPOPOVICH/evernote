import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { History, LocationState } from 'history';

import { MainLayout } from '@layouts';

import { AuthorizationPage, HomePage, NotesPage } from '@pages';

interface AppRoutesProps<S = LocationState> {
  history: History<S>;
}

/**
 * @param {AppRoutesProps} props - пропсы компонента
 *
 * @returns {JSX.Element} Компонент с роутами приложения
 */
export function AppRoutes<S = LocationState>({
  history,
}: AppRoutesProps<S>): JSX.Element {
  return (
    <ConnectedRouter history={history}>
      <MainLayout>
        <Switch>
          <Route path="/auth" component={AuthorizationPage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/notes" component={NotesPage} />
        </Switch>
      </MainLayout>
    </ConnectedRouter>
  );
}
