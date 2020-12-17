import { AppLogo } from '@src/assets/images/index';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AppLogoComponent = ({ className }) => (
  <img className={className} src={AppLogo} alt='App logo' />
);

AppLogoComponent.propTypes = {
  className: PropTypes.string.isRequired,
};

const StyledAppLogo = styled(props => <AppLogoComponent {...props} />)`
  width: 130px;
  height: 130px;
`;

export default StyledAppLogo;
