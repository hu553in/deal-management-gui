import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '../../atoms/index';
import HidePassword from './images/hide-password.svg';
import ShowPassword from './images/show-password.svg';

const StyledTextField = styled(TextField)`
  padding-right: 56px;
`;

const StyledButton = styled(Button)`
  position: relative;
  left: -41px;
  top: 7px;
`;

const PasswordField = ({
  value,
  placeholder,
  onChange,
  onKeyUp,
  invalid
}) => {
  const [type, setType] = useState('password');
  return (
    <>
      <StyledTextField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        invalid={invalid}
      />
      <StyledButton
        onClick={() => setType(
          type === 'password'
            ? 'text'
            : 'password'
        )}
        icon={
          type === 'password'
            ? ShowPassword
            : HidePassword
        }
      />
    </>
  );
};

PasswordField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func,
  invalid: PropTypes.bool
};

PasswordField.defaultProps = {
  placeholder: '',
  onKeyUp: () => { },
  invalid: false
};

export default PasswordField;
