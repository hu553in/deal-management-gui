import { AppLogo, HeaderNavBar, UserInfoSection } from '@src/components/index';
import { ROUTES } from '@src/constants';
import { authManagementService } from '@src/services/index';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useCallback } from 'react';

const StyledHeaderNavBar = styled(props => <HeaderNavBar {...props} />)`
  margin: 0 60px;
`;

const Header = ({ className }) => {
  const history = useHistory();
  const user = authManagementService.getUser();
  const navLinks = [
    { text: 'Customers', route: ROUTES.CUSTOMERS },
    { text: 'Providers', route: ROUTES.PROVIDERS },
    { text: 'Deals', route: ROUTES.DEALS },
  ];
  const signOut = useCallback(() => {
    authManagementService.clear();
    history.push(ROUTES.DEFAULT);
  }, [history]);
  return (
    <header className={className}>
      <AppLogo />
      <StyledHeaderNavBar links={navLinks} />
      <UserInfoSection
        email={user.email}
        role={user.role}
        signOutCallback={signOut}
      />
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string.isRequired,
};

const StyledHeader = styled(props => <Header {...props} />)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 72px;
`;

export default StyledHeader;
