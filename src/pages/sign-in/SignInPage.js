import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthForm } from '../../components/index';
import { ROUTES } from '../../constants';
import { authManagementService } from '../../services/index';

const SignInPage = () => {
  const history = useHistory();
  const [error, setError] = useState(undefined);
  const signIn = (email, password) => {
    setError(undefined);
    axios
      .post(ROUTES.SIGN_IN, { email, password })
      .then((response) => {
        authManagementService.setToken(response.data.data.token);
        authManagementService.setUser(response.data.data.user);
        history.push(ROUTES.DEFAULT);
      })
      .catch(() => setError(
        "Unable to sign in. Please check " +
        "the entered data or try again later."
      ));
  }
  return (
    <AuthForm
      submitCallback={signIn}
      authSuggestionText={"Do not have an account yet?"}
      authSuggestionLink={{
        text: 'Sign up',
        route: ROUTES.SIGN_UP
      }}
      submitButtonText="Sign in"
      error={error}
    />
  );
};

export default SignInPage;
