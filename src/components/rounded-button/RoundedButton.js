import PropTypes from 'prop-types';
import styled from 'styled-components';

const RoundedButton = ({ onClick, className, disabled }) => (
  <button className={className} onClick={onClick} disabled={disabled} />
);

RoundedButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

RoundedButton.defaultProps = {
  disabled: false,
};

const StyledRoundedButton = styled(props => <RoundedButton {...props} />)`
  width: 49px;
  height: 49px;
  border-radius: 50%;
  border: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({ icon }) => icon});
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

StyledRoundedButton.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  disabledColor: PropTypes.string,
};

StyledRoundedButton.defaultProps = {
  color: '#00a67c',
  hoverColor: '#006c51',
  activeColor: '#004231',
  disabledColor: '#c7c7c7',
};

export default StyledRoundedButton;
