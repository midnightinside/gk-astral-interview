import { Outlet } from 'react-router-dom';

import { logout, selectSession } from '~/modules/auth/authSlice';
import { Page } from '~/shared/ui/Layout';

import { APP_TITLE, buildNavigation, FOOTER_CONTACTS } from './constants';
import { useAppDispatch, useAppSelector } from './hooks';

/**
 * Общая оболочка страниц: собирает данные для Header и Footer и передаёт их
 * через пропсы.
 */
export const AppLayout = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Page
      title={APP_TITLE}
      navigation={buildNavigation(session !== null)}
      user={session?.user ?? null}
      contacts={FOOTER_CONTACTS}
      onLogout={handleLogout}
    >
      <Outlet />
    </Page>
  );
};
