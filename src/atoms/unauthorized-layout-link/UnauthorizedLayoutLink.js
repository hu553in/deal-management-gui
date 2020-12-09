import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../../constants';

const UnauthorizedLayoutLink = ({ text, route, className }) => (
  <Link className={className} to={route}>
    {text}
  </Link>
);

UnauthorizedLayoutLink.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.oneOf(Object.values(ROUTES)).isRequired,
  className: PropTypes.string.isRequired
};

const StyledUnauthorizedLayoutLink = styled(UnauthorizedLayoutLink)`
  font-size: 18px;
  font-weight: bold;
  color: #006c51;
  display: inline-block;
  text-decoration: none;
  letter-spacing: 0.04em;
`;

export default StyledUnauthorizedLayoutLink;
