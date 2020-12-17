import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import './index.css';
import {
  CustomersPage,
  DealsPage,
  ProvidersPage,
  SignInPage,
  SignUpPage,
} from './pages/index';
import reportWebVitals from './reportWebVitals';
import {
  configureAxios,
  renderMainLayout,
  renderUnauthorizedLayout,
} from './util/index';

configureAxios();

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path={ROUTES.SIGN_IN}
        render={() => renderUnauthorizedLayout(SignInPage)}
      />
      <Route
        exact
        path={ROUTES.SIGN_UP}
        render={() => renderUnauthorizedLayout(SignUpPage)}
      />
      <Route
        exact
        path={ROUTES.CUSTOMERS}
        render={() => renderMainLayout(CustomersPage)}
      />
      <Route
        exact
        path={ROUTES.PROVIDERS}
        render={() => renderMainLayout(ProvidersPage)}
      />
      <Route
        exact
        path={ROUTES.DEALS}
        render={() => renderMainLayout(DealsPage)}
      />
      <Redirect to={ROUTES.CUSTOMERS} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
