import { auth } from '@src/api/index';
import { AuthForm } from '@src/components/index';
import { ROUTES } from '@src/constants';
import { authManagementService } from '@src/services/index';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignInPage = () => {
  const history = useHistory();
  const [error, setError] = useState(undefined);
  const signIn = (email, password) => {
    setError(undefined);
    auth
      .signIn(email, password)
      .then(response => {
        authManagementService.setToken(response.data.data.token);
        authManagementService.setUser(response.data.data.user);
        history.push(ROUTES.DEFAULT);
      })
      .catch(e => {
        setError(
          'Unable to sign in. Please check ' +
            'the entered data or try again later.'
        );
        throw e;
      });
  };
  return (
    <AuthForm
      submitCallback={signIn}
      authSuggestionText={'Do not have an account yet?'}
      authSuggestionLink={{
        text: 'Sign up',
        route: ROUTES.SIGN_UP,
      }}
      submitButtonText='Sign in'
      error={error}
    />
  );
};

export default SignInPage;
