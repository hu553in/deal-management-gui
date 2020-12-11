import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, UserInfo } from '../index';
import { USER_ROLES } from '../../constants';
import SignOutActive from './images/sign-out-active.svg';
import SignOutHover from './images/sign-out-hover.svg';
import SignOutNormal from './images/sign-out-normal.svg';

const StyledButton = styled(
  (props) => <Button {...props} />
)`
  margin-left: 10px;
`;

const UserInfoSection = ({
  email,
  role,
  signOutCallback,
  className
}) => (
    <div className={className}>
      <UserInfo email={email} role={role} />
      <StyledButton
        onClick={signOutCallback}
        icon={SignOutNormal}
        hoverIcon={SignOutHover}
        activeIcon={SignOutActive}
      />
    </div>
  );

UserInfoSection.propTypes = {
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(Object.values(USER_ROLES)).isRequired,
  signOutCallback: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

const StyledUserInfoSection = styled(
  (props) => <UserInfoSection {...props} />
)`
  display: flex;
  align-items: center;
`;

export default StyledUserInfoSection;
