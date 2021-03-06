import { Eye, EyeCrossed } from '@src/assets/icons/index';
import { Button, TextField } from '@src/components/index';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

const StyledTextField = styled(props => <TextField {...props} />)`
  && {
    padding-right: 56px;
  }
`;

const StyledButton = styled(props => <Button {...props} />)`
  position: absolute;
  right: 14px;
  top: 7px;
`;

const PasswordField = ({
  value,
  placeholder,
  onChange,
  onKeyUp,
  onFocusOut,
  invalid,
  className,
}) => {
  const [type, setType] = useState('password');
  return (
    <div className={className}>
      <StyledTextField
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onFocusOut={onFocusOut}
        invalid={invalid}
      />
      <StyledButton
        onClick={() => setType(type === 'password' ? 'text' : 'password')}
        icon={type === 'password' ? Eye : EyeCrossed}
      />
    </div>
  );
};

PasswordField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func,
  onFocusOut: PropTypes.func,
  invalid: PropTypes.bool,
};

PasswordField.defaultProps = {
  placeholder: '',
  onKeyUp: () => {},
  onFocusOut: () => {},
  invalid: false,
};

const StyledPasswordField = styled(props => <PasswordField {...props} />)`
  position: relative;
  display: inline-block;
`;

export default StyledPasswordField;
