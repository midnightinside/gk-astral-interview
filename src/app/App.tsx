import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CardsScreen } from '~/screens/CardsScreen';
import { HomeScreen } from '~/screens/HomeScreen';
import { LoginScreen } from '~/screens/LoginScreen';
import { ProfileScreen } from '~/screens/ProfileScreen';
import { GlobalStyles } from '~/shared/ui/GlobalStyles';

import { AppLayout } from './AppLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES } from './routes';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path={ROUTES.home} element={<HomeScreen />} />
            <Route path={ROUTES.login} element={<LoginScreen />} />

            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.cards} element={<CardsScreen />} />
              <Route path={ROUTES.profile} element={<ProfileScreen />} />
            </Route>

            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
