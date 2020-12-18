import {
  AppLogo,
  AuthError,
  AuthSuggestionLink,
  AuthSuggestionText,
  OvalButton,
  PasswordField,
  RenderIfTrue,
  TextField,
  TextFieldLeftLabel,
} from '@src/components/index';
import { EMAIL_REGEX } from '@src/constants';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

const StyledAppLogo = styled(props => <AppLogo {...props} />)`
  margin-top: 32px;
`;

const StyledEmailFieldLeftLabel = styled(props => (
  <TextFieldLeftLabel {...props} />
))`
  margin-right: 71px;
`;

const StyledPasswordFieldLeftLabel = styled(props => (
  <TextFieldLeftLabel {...props} />
))`
  margin-right: 26px;
`;

const StyledOvalButton = styled(props => <OvalButton {...props} />)`
  margin-top: 30px;
`;

const StyledAuthSuggestionLink = styled(props => (
  <AuthSuggestionLink {...props} />
))`
  margin-left: 5px;
`;

const StyledAuthError = styled(props => <AuthError {...props} />)`
  margin-top: 20px;
  max-width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const AuthForm = ({
  submitCallback,
  authSuggestionText,
  authSuggestionLink,
  submitButtonText,
  error,
  className,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const onSubmit = () => submitCallback(email, password);
  const onChangeEmailField = event => {
    event.preventDefault();
    setEmailValid(true);
    setEmail(event.target.value);
  };
  const onChangePasswordField = event => {
    event.preventDefault();
    setPasswordValid(true);
    setPassword(event.target.value);
  };
  const checkEmailValidity = () =>
    setEmailValid(email.length === 0 || EMAIL_REGEX.test(email));
  const checkPasswordValidity = () =>
    setPasswordValid(password.length === 0 || password.length > 8);
  const submitButtonDisabled =
    email.length === 0 ||
    password.length === 0 ||
    !emailValid ||
    !passwordValid;
  return (
    <section className={className}>
      <StyledAppLogo />
      <div style={{ marginTop: '30px' }}>
        <StyledEmailFieldLeftLabel text='Email' />
        <TextField
          value={email}
          placeholder='Enter email'
          onChange={onChangeEmailField}
          onFocusOut={checkEmailValidity}
          invalid={!emailValid}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <StyledPasswordFieldLeftLabel text='Password' />
        <PasswordField
          value={password}
          placeholder='Enter password'
          onChange={onChangePasswordField}
          onFocusOut={checkPasswordValidity}
          invalid={!passwordValid}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <AuthSuggestionText text={authSuggestionText} />
        <StyledAuthSuggestionLink
          text={authSuggestionLink.text}
          route={authSuggestionLink.route}
        />
      </div>
      <StyledOvalButton
        text={submitButtonText}
        onClick={onSubmit}
        disabled={submitButtonDisabled}
      />
      <RenderIfTrue statement={error !== undefined}>
        <StyledAuthError text={error} />
      </RenderIfTrue>
    </section>
  );
};

AuthForm.propTypes = {
  submitCallback: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  authSuggestionText: PropTypes.string.isRequired,
  authSuggestionLink: PropTypes.object.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  error: PropTypes.string,
};

AuthForm.defaultProps = {
  error: undefined,
};

const StyledAuthForm = styled(props => <AuthForm {...props} />)`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  height: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

export default StyledAuthForm;
