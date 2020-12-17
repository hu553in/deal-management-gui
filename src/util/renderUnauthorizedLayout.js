import { ROUTES } from '@src/constants';
import { UnauthorizedLayout } from '@src/layouts/index';
import { authManagementService } from '@src/services/index';
import { Redirect } from 'react-router-dom';

const renderUnauthorizedLayout = Component => {
  if (authManagementService.isAuthDataPresent()) {
    return <Redirect to={ROUTES.DEFAULT} />;
  }
  return (
    <UnauthorizedLayout>
      <Component />
    </UnauthorizedLayout>
  );
};

export default renderUnauthorizedLayout;
