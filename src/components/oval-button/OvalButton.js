import PropTypes from 'prop-types';
import styled from 'styled-components';

const OvalButton = ({ text, onClick, disabled, className }) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

OvalButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

const StyledOvalButton = styled((props) => <OvalButton {...props} />)`
  width: 182px;
  height: 49px;
  border-radius: 28px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: 0;
  background-color: ${({ color }) => color};
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
  &:active {
    background-color: ${({ activeColor }) => activeColor};
  }
  &:disabled {
    background-color: ${({ disabledColor }) => disabledColor};
  }
`;

StyledOvalButton.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  disabledColor: PropTypes.string
};

StyledOvalButton.defaultProps = {
  color: '#00a67c',
  hoverColor: '#006c51',
  activeColor: '#004231',
  disabledColor: '#c7c7c7'
}

export default StyledOvalButton;
