import PropTypes from 'prop-types';
import styled from 'styled-components';

const UnauthorizedLayoutText = ({ text, className }) => (
  <span className={className}>{text}</span>
);

UnauthorizedLayoutText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

const StyledUnauthorizedLayoutText = styled(UnauthorizedLayoutText)`
  font-size: 18px;
  display: inline-block;
  letter-spacing: 0.04em;
`;

export default StyledUnauthorizedLayoutText;
