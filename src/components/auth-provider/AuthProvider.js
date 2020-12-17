import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ROUTES } from '@src/constants';

const AuthProvider = ({ children }) => {
  useEffect(() => axios.get(ROUTES.WHOAMI));
  return children;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
