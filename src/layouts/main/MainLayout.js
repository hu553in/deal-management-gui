import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => (
  <main>{children}</main>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
