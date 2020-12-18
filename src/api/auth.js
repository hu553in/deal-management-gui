import { API_ENDPOINTS } from '@src/constants';
import axios from 'axios';

class Auth {
  signIn(email, password) {
    return axios.post(API_ENDPOINTS.SIGN_IN, { email, password });
  }

  signUp(email, password) {
    return axios.post(API_ENDPOINTS.SIGN_UP, { email, password });
  }

  whoami() {
    return axios.get(API_ENDPOINTS.WHOAMI);
  }
}

export default new Auth();
