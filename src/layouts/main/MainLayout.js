import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../../components/index';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
