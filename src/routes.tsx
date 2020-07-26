import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';

import { AboutPage, HomePage } from '@pages';
import { MainLayout } from '@common/layouts/MainLayout';

export const AppRoutes = ({ history }: { history: any }) => (
  <ConnectedRouter history={history}>
    <MainLayout>
      <Switch>
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </MainLayout>
  </ConnectedRouter>
);
