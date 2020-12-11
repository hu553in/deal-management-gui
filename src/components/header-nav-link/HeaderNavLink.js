import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../../constants';

const HeaderNavLink = ({ text, route, className }) => (
  <Link className={className} to={route}>
    {text}
  </Link>
);

HeaderNavLink.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.oneOf(Object.values(ROUTES)).isRequired,
  className: PropTypes.string.isRequired
};

const StyledHeaderNavLink = styled(
  (props) => <HeaderNavLink {...props} />
)`
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  width: 145px;
  height: 43px;
  display: inline-block;
  text-decoration: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:visited {
    color: #000;
  }
  &:hover {
    color: #007b5c;
  }
  &:active {
    color: #004231;
  }
  ${({ current }) => current && `&::after {
    position: absolute;
    content: '';
    left: -6px;
    bottom: 0;
    width: calc(100% + 12px);
    height: 6px;
    background-color: #9dd7c8;
  }`}
`;

StyledHeaderNavLink.propTypes = {
  current: PropTypes.bool
};

StyledHeaderNavLink.defaultProps = {
  current: false
};

export default StyledHeaderNavLink;
