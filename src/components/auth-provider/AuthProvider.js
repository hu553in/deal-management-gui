import { auth } from '@src/api/index';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const AuthProvider = ({ children }) => {
  useEffect(() => auth.whoami());
  return children;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
