import { ROUTES } from '@src/constants';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderNavBarLink = ({ text, route, className }) => (
  <Link className={className} to={route}>
    {text}
  </Link>
);

HeaderNavBarLink.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.oneOf(Object.values(ROUTES)).isRequired,
  className: PropTypes.string.isRequired,
};

const StyledHeaderNavBarLink = styled(props => <HeaderNavBarLink {...props} />)`
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  height: 43px;
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

  ${({ current }) =>
    current &&
    `&::after {
    position: absolute;
    content: '';
    left: -6px;
    bottom: 0;
    width: calc(100% + 12px);
    height: 6px;
    background-color: #9dd7c8;
  }`}
`;

StyledHeaderNavBarLink.propTypes = {
  current: PropTypes.bool,
};

StyledHeaderNavBarLink.defaultProps = {
  current: false,
};

export default StyledHeaderNavBarLink;
