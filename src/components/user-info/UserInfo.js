import PropTypes from 'prop-types';
import styled from 'styled-components';
import { USER_ROLES, USER_ROLES_TO_RENDER } from '../../constants';

const UserInfo = ({ email, role, className }) => (
  <div className={className}>
    <span id="userInfo__email">{email}</span>
    <span id="userInfo__role">{USER_ROLES_TO_RENDER[role]}</span>
  </div>
);

UserInfo.propTypes = {
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(Object.values(USER_ROLES)).isRequired,
  className: PropTypes.string.isRequired
};

const StyledUserInfo = styled(
  (props) => <UserInfo {...props} />
)`
  color: #838383;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  & #userInfo__email {
    font-size: 20px;
  }
  & #userInfo__role {
    margin-top: 4px;
    font-size: 16px;
  }
`;

export default StyledUserInfo;
