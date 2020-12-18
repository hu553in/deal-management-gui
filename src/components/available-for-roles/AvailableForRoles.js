import { RenderIfTrue } from '@src/components/index';
import { USER_ROLES } from '@src/constants';
import { authManagementService } from '@src/services/index';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

const AvailableForRoles = ({ children, roles }) => {
  const user = authManagementService.getUser();
  const isAvailable = useMemo(() => roles.includes(user.role), [user, roles]);
  return <RenderIfTrue statement={isAvailable}>{children}</RenderIfTrue>;
};

AvailableForRoles.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.oneOf(Object.values(USER_ROLES)))
    .isRequired,
};

export default AvailableForRoles;
