import { ExitActive, ExitHover, ExitNormal } from '@src/assets/icons/index';
import { Button, UserInfo } from '@src/components/index';
import { USER_ROLES } from '@src/constants';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled(props => <Button {...props} />)`
  margin-left: 10px;
`;

const UserInfoSection = ({ email, role, signOutCallback, className }) => (
  <div className={className}>
    <UserInfo email={email} role={role} />
    <StyledButton
      onClick={signOutCallback}
      icon={ExitNormal}
      hoverIcon={ExitHover}
      activeIcon={ExitActive}
    />
  </div>
);

UserInfoSection.propTypes = {
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(Object.values(USER_ROLES)).isRequired,
  signOutCallback: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

const StyledUserInfoSection = styled(props => <UserInfoSection {...props} />)`
  display: flex;
  align-items: center;
`;

export default StyledUserInfoSection;
