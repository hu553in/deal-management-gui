import { USER_ROLES, USER_ROLES_TO_RENDER } from '@src/constants';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledEmailSpan = styled.span`
  font-size: 20px;
`;

const StyledRoleSpan = styled.span`
  margin-top: 4px;
  font-size: 16px;
`;

const UserInfo = ({ email, role, className }) => (
  <div className={className}>
    <StyledEmailSpan>{email}</StyledEmailSpan>
    <StyledRoleSpan>{USER_ROLES_TO_RENDER[role]}</StyledRoleSpan>
  </div>
);

UserInfo.propTypes = {
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(Object.values(USER_ROLES)).isRequired,
  className: PropTypes.string.isRequired,
};

const StyledUserInfo = styled(props => <UserInfo {...props} />)`
  color: #838383;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default StyledUserInfo;
