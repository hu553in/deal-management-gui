import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { ROUTES } from './constants';
import './index.css';
import { MainLayout, UnauthorizedLayout } from './layouts/index';
import { SignInPage, SignUpPage } from './pages/index';
import reportWebVitals from './reportWebVitals';
import { authManagementService } from './services/index';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.request.use((config) => {
  if (authManagementService.isAuthenticated()) {
    config.headers.Authorization = (
      `Bearer ${authManagementService.getToken()}`
    );
  }
  return config;
});

const renderMainLayout = (Component) => {
  if (!authManagementService.isAuthenticated()) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }
  return (
    <MainLayout>
      <Component />
    </MainLayout>
  );
};

const renderUnauthorizedLayout = (Component) => {
  if (authManagementService.isAuthenticated()) {
    return <Redirect to={ROUTES.DEFAULT} />;
  }
  return (
    <UnauthorizedLayout>
      <Component />
    </UnauthorizedLayout>
  );
};

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
        render={() => renderMainLayout(() => (<>Customers!</>))}
      />
      <Route
        exact
        path={ROUTES.PROVIDERS}
        render={() => renderMainLayout(() => (<>Providers!</>))}
      />
      <Route
        exact
        path={ROUTES.DEALS}
        render={() => renderMainLayout(() => (<>Deals!</>))}
      />
      <Redirect to={ROUTES.CUSTOMERS} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
