import PropTypes from 'prop-types';
import styled from 'styled-components';

const AuthError = ({ text, className }) => (
  <span className={className}>{text}</span>
);

AuthError.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

const StyledAuthError = styled(
  (props) => <AuthError {...props} />
)`
  color: #ee752e;
  font-size: 18px;
  display: inline-block;
`;

export default StyledAuthError;
