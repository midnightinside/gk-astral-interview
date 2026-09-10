import { Navigate, Outlet } from 'react-router-dom';

import { selectIsAuthenticated } from '~/modules/auth/authSlice';

import { useAppSelector } from './hooks';
import { ROUTES } from './routes';

/**
 * Маршруты, недоступные без авторизации.
 */
export const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <Outlet />;
};
