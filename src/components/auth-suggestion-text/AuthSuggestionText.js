import PropTypes from 'prop-types';
import styled from 'styled-components';

const AuthSuggestionText = ({ text, className }) => (
  <span className={className}>{text}</span>
);

AuthSuggestionText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

const StyledAuthSuggestionText = styled(props => (
  <AuthSuggestionText {...props} />
))`
  font-size: 18px;
  display: inline-block;
`;

export default StyledAuthSuggestionText;
