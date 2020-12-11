import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContextMenuItem = ({ text, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {text}
  </button>
);

ContextMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

const StyledContextMenuItem = styled(
  (props) => <ContextMenuItem {...props} />
)`
  color: #838383;
  font-size: 18px;
  height: 42px;
  padding: 0 54px;
  margin: 2px 0;
  text-align: left;
  width: 100%;
  border: 0;
  background-color: transparent;
  background-position: left 14px center;
  background-repeat: no-repeat;
  background-image: url(${({ icon }) => icon});
`;

StyledContextMenuItem.propTypes = {
  icon: PropTypes.string.isRequired
};

export default StyledContextMenuItem;
