import { HeaderNavBarLink } from '@src/components/index';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeaderNavBarLink = styled(props => <HeaderNavBarLink {...props} />)`
  margin-right: 80px;

  &:last-child {
    margin-right: 0;
  }
`;

const HeaderNavBar = ({ links, className }) => {
  const location = useLocation();
  const linkElements = links.map(link => (
    <StyledHeaderNavBarLink
      key={link.route}
      text={link.text}
      route={link.route}
      current={location.pathname.includes(link.route)}
    />
  ));
  return <nav className={className}>{linkElements}</nav>;
};

HeaderNavBar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string.isRequired,
};

const StyledHeaderNavBar = styled(props => <HeaderNavBar {...props} />)`
  display: inline-flex;
  justify-content: space-between;
`;

export default StyledHeaderNavBar;
