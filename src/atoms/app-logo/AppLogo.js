import PropTypes from 'prop-types';
import styled from 'styled-components';
import appLogo from './images/app-logo.png';

const AppLogo = ({ className }) => (
  <img className={className} src={appLogo} alt="App logo" />
);

AppLogo.propTypes = {
  className: PropTypes.string.isRequired
};

const StyledOvalButton = styled(AppLogo)`
  width: 130px;
  height: 130px;
`;

export default StyledOvalButton;
