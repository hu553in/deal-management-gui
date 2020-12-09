import PropTypes from 'prop-types';
import styled from 'styled-components';

const UnauthorizedLayoutError = ({ text, className }) => (
  <span className={className}>{text}</span>
);

UnauthorizedLayoutError.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

const StyledUnauthorizedLayoutError = styled(UnauthorizedLayoutError)`
  color: #ee752e;
  font-size: 18px;
  display: inline-block;
`;

export default StyledUnauthorizedLayoutError;
