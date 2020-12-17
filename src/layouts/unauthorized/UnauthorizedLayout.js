import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const UnauthorizedLayout = ({ children, className }) => (
  <main className={className}>{children}</main>
);

UnauthorizedLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

const StyledUnauthorizedLayout = styled(props => (
  <UnauthorizedLayout {...props} />
))`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

export default StyledUnauthorizedLayout;
