import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from 'styled-components';

const Button = forwardRef(({ onClick, className }, ref) => (
  <button ref={ref} className={className} onClick={onClick} />
));

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

const StyledButton = styled(Button)`
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({ icon }) => icon});

  ${({ hoverIcon }) =>
    hoverIcon &&
    `&:hover {
    background-image: url(${hoverIcon});
  }`}

  ${({ activeIcon }) =>
    activeIcon &&
    `&:active {
    background-image: url(${activeIcon});
  }`}
`;

StyledButton.propTypes = {
  icon: PropTypes.string.isRequired,
  hoverIcon: PropTypes.string,
  activeIcon: PropTypes.string,
};

StyledButton.defaultProps = {
  hoverIcon: null,
  activeIcon: null,
};

export default StyledButton;
