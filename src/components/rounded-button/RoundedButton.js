import PropTypes from 'prop-types';
import styled from 'styled-components';

const RoundedButton = ({ onClick, className }) => (
  <button className={className} onClick={onClick} />
);

RoundedButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

const StyledRoundedButton = styled(
  (props) => <RoundedButton {...props} />
)`
  width: 49px;
  height: 49px;
  border-radius: 50%;
  border: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${({ icon }) => icon};
  background-color: ${({ color }) => color};
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
  &:active {
    background-color: ${({ activeColor }) => activeColor};
  }
`;

StyledRoundedButton.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string
};

StyledRoundedButton.defaultProps = {
  color: '#00a67c',
  hoverColor: '#006c51',
  activeColor: '#004231'
}

export default StyledRoundedButton;
