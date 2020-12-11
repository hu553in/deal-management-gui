import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextFieldLeftLabel = ({ text, className }) => (
  <span className={className}>{text}</span>
);

TextFieldLeftLabel.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

const StyledTextFieldLeftLabel = styled(
  (props) => <TextFieldLeftLabel {...props} />
)`
  font-size: 24px;
  display: inline-block;
`;

export default StyledTextFieldLeftLabel;
