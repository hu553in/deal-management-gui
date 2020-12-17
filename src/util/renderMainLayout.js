import { AuthProvider } from '@src/components/index';
import { ROUTES } from '@src/constants';
import { MainLayout } from '@src/layouts/index';
import { authManagementService } from '@src/services/index';
import { Redirect } from 'react-router-dom';

const renderMainLayout = Component => {
  if (!authManagementService.isAuthDataPresent()) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }
  return (
    <AuthProvider>
      <MainLayout>
        <Component />
      </MainLayout>
    </AuthProvider>
  );
};

export default renderMainLayout;
