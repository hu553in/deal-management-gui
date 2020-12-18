import { auth } from '@src/api/index';
import { AuthForm } from '@src/components/index';
import { ROUTES } from '@src/constants';
import { authManagementService } from '@src/services/index';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignUpPage = () => {
  const history = useHistory();
  const [error, setError] = useState(undefined);
  const signUp = (email, password) => {
    setError(undefined);
    auth
      .signUp(email, password)
      .then(response => {
        authManagementService.setToken(response.data.data.token);
        authManagementService.setUser(response.data.data.user);
        history.push(ROUTES.DEFAULT);
      })
      .catch(e => {
        setError(
          'Unable to sign up. Please check ' +
            'the entered data or try again later.'
        );
        throw e;
      });
  };
  return (
    <AuthForm
      submitCallback={signUp}
      authSuggestionText={'Already have an account?'}
      authSuggestionLink={{
        text: 'Sign in',
        route: ROUTES.SIGN_IN,
      }}
      submitButtonText='Sign up'
      error={error}
    />
  );
};

export default SignUpPage;
