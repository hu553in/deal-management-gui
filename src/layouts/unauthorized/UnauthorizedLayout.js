import React from 'react';
import PropTypes from 'prop-types';

const UnauthorizedLayout = ({ children }) => (
  <main>{children}</main>
);

UnauthorizedLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default UnauthorizedLayout;
