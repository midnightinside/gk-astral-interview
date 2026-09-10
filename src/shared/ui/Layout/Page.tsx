import styled from '@emotion/styled';
import { type ReactNode } from 'react';

import { Body } from './Body';
import { Footer, type FooterContacts } from './Footer';
import { Header, type HeaderUser, type NavigationItem } from './Header';

type PageProps = {
  title: string;
  navigation: NavigationItem[];
  user: HeaderUser | null;
  contacts: FooterContacts;
  onLogout: () => void;
  children: ReactNode;
};

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
});

/**
 * Страница целиком: Header, Body и Footer.
 *
 * Иерархия компонентов соответствует требованиям задания, данные для Header и
 * Footer прокидываются через пропсы.
 */
export const Page = ({
  title,
  navigation,
  user,
  contacts,
  onLogout,
  children,
}: PageProps) => {
  return (
    <Root>
      <Header
        title={title}
        navigation={navigation}
        user={user}
        onLogout={onLogout}
      />
      <Body>{children}</Body>
      <Footer contacts={contacts} />
    </Root>
  );
};
