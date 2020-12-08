import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import './index.css';
import { MainLayout, UnauthorizedLayout } from './layouts/index';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Stubs for "progressive JPEG" development process
const StubComponent = () => (<>I'm a stub!</>);
const isAuthenticated = () => false;

const renderMainLayout = (Component) => {
  if (!isAuthenticated()) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }
  return (
    <MainLayout>
      <Component />
    </MainLayout>
  );
};

const renderUnauthorizedLayout = (Component) => {
  if (isAuthenticated()) {
    return <Redirect to={ROUTES.DEFAULT} />;
  }
  return (
    <UnauthorizedLayout>
      <Component />
    </UnauthorizedLayout>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={ROUTES.SIGN_IN}
          render={() => renderUnauthorizedLayout(StubComponent)}
        />
        <Route
          exact
          path={ROUTES.SIGN_UP}
          render={() => renderUnauthorizedLayout(StubComponent)}
        />
        <Route
          exact
          path={ROUTES.CUSTOMERS}
          render={() => renderMainLayout(StubComponent)}
        />
        <Route
          exact
          path={ROUTES.PROVIDERS}
          render={() => renderMainLayout(StubComponent)}
        />
        <Route
          exact
          path={ROUTES.DEALS}
          render={() => renderMainLayout(StubComponent)}
        />
        <Redirect to={ROUTES.CUSTOMERS} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
