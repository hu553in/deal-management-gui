import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextField = ({
  value,
  type,
  placeholder,
  onChange,
  onKeyUp,
  onFocusOut,
  maxLength,
  className
}) => (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onBlur={onFocusOut}
      maxLength={maxLength}
    />
  );

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password']),
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func,
  onFocusOut: PropTypes.func,
  maxLength: PropTypes.number
};

TextField.defaultProps = {
  type: 'text',
  placeholder: '',
  onKeyUp: () => { },
  onFocusOut: () => { },
  maxLength: 255
};

const getTextFieldColor = (value, invalid) => {
  if (invalid) {
    return '#a63e00';
  }
  if (value.length > 0) {
    return '#414141';
  }
  return '#838383';
}

const StyledTextField = styled(
  (props) => <TextField {...props} />
)`
  width: 327px;
  height: 41px;
  display: inline-block;
  border-radius: 3px;
  border: 1px solid ${({ value, invalid }) => (
    getTextFieldColor(value, invalid)
  )};
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: ${({ value, invalid }) => (
    getTextFieldColor(value, invalid)
  )};
  padding: 0 15px;
`;

StyledTextField.propTypes = {
  value: PropTypes.string.isRequired,
  invalid: PropTypes.bool
};

StyledTextField.defaultProps = {
  invalid: false
};

export default StyledTextField;
