import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextField = ({
  value,
  type,
  placeholder,
  onChange,
  onKeyUp,
  className
}) => (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password']),
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func
};

TextField.defaultProps = {
  type: 'text',
  placeholder: '',
  onKeyUp: () => { }
};

const StyledTextField = styled(TextField)`
  height: 41px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ value, invalid }) => {
    if (invalid) {
      return '#a63e00';
    }
    if (value.length > 0) {
      return '#414141';
    }
    return '#838383';
  }};
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: ${({ value, invalid }) => {
    if (invalid) {
      return '#a63e00';
    }
    if (value && value.length && value.length > 0) {
      return '#414141';
    }
    return '#c7c7c7';
  }};
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
