import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthForm } from '../../components/index';
import { ROUTES } from '../../constants';
import { authManagementService } from '../../services/index';

const SignUpPage = () => {
  const history = useHistory();
  const [error, setError] = useState(undefined);
  const signUp = (email, password) => {
    setError(undefined);
    axios
      .post(ROUTES.SIGN_UP, { email, password })
      .then((response) => {
        authManagementService.setToken(response.data.data.token);
        authManagementService.setUser(response.data.data.user);
        history.push(ROUTES.DEFAULT);
      })
      .catch(() => setError(
        "Unable to sign up. Please check " +
        "the entered data or try again later."
      ));
  }
  return (
    <AuthForm
      submitCallback={signUp}
      authSuggestionText={"Already have an account?"}
      authSuggestionLink={{
        text: 'Sign in',
        route: ROUTES.SIGN_IN
      }}
      submitButtonText="Sign up"
      error={error}
    />
  );
};

export default SignUpPage;
