import { ROUTES } from '@src/constants';
import { authManagementService } from '@src/services/index';
import axios from 'axios';

const configureAxios = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.interceptors.request.use(
    config => {
      if (authManagementService.isAuthDataPresent()) {
        config.headers[
          'Authorization'
        ] = `Bearer ${authManagementService.getToken()}`;
      }
      if (config.method === 'post' || config.method === 'patch') {
        config.headers['Content-Type'] = 'application/json';
      }
      return Promise.resolve(config);
    },
    error => Promise.reject(error)
  );
  axios.interceptors.response.use(
    config => Promise.resolve(config),
    error => {
      if (error.response.status === 401) {
        if (authManagementService.isAuthDataPresent()) {
          authManagementService.clear();
        }
        window.location.href = `${window.location.origin}${ROUTES.SIGN_IN}`;
      }
      return Promise.reject(error);
    }
  );
};

export default configureAxios;
