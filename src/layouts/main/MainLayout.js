import { Header } from '@src/components/index';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledMain = styled.main`
  margin: 0 73px 60px 73px;
`;

const MainLayout = ({ children }) => (
  <>
    <Header />
    <StyledMain>{children}</StyledMain>
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
