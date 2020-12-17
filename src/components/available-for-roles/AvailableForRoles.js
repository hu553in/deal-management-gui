import { USER_ROLES } from '@src/constants';
import { authManagementService } from '@src/services/index';
import PropTypes from 'prop-types';

const AvailableForRoles = ({ children, roles }) =>
  roles.includes(authManagementService.getUser().role) ? children : null;

AvailableForRoles.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.oneOf(Object.values(USER_ROLES)))
    .isRequired,
};

export default AvailableForRoles;
