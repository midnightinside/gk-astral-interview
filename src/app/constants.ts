import { type FooterContacts, type NavigationItem } from '~/shared/ui/Layout';

import { ROUTES } from './routes';

export const APP_TITLE = 'Word Cards';

export const FOOTER_CONTACTS: FooterContacts = {
  company: 'Word Cards',
  phone: '+7 (900) 000-00-00',
  email: 'hello@word-cards.dev',
  address: 'Калуга, Россия',
};

/**
 * Навигация зависит от наличия сессии: профиль доступен только после входа.
 */
export const buildNavigation = (isAuthenticated: boolean): NavigationItem[] => {
  const items: NavigationItem[] = [
    { to: ROUTES.home, label: 'Главная' },
    { to: ROUTES.cards, label: 'Карточки' },
  ];

  if (isAuthenticated) {
    return [...items, { to: ROUTES.profile, label: 'Профиль' }];
  }

  return [...items, { to: ROUTES.login, label: 'Вход' }];
};
