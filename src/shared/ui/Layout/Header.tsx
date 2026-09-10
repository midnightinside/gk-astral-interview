import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

import { spacing, theme } from '~/shared/theme';
import { Button } from '~/shared/ui/Button';
import { Typography } from '~/shared/ui/Typography';

export type NavigationItem = {
  to: string;
  label: string;
};

export type HeaderUser = {
  name: string;
  email: string;
};

type HeaderProps = {
  title: string;
  navigation: NavigationItem[];
  user: HeaderUser | null;
  onLogout: () => void;
};

const Root = styled.header({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  background: theme.color.surface,
  borderBottom: `1px solid ${theme.color.border}`,
  boxShadow: theme.shadow.sm,
});

const Inner = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(6),
  width: '100%',
  maxWidth: theme.layout.contentWidth,
  minHeight: theme.layout.headerHeight,
  margin: '0 auto',
  padding: `${spacing(3)} ${spacing(5)}`,

  [`@media (max-width: ${theme.breakpoint.md})`]: {
    flexWrap: 'wrap',
    gap: spacing(3),
  },
});

const Logo = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(2),
  marginRight: 'auto',
});

const LogoMark = styled.div({
  display: 'grid',
  placeItems: 'center',
  width: '34px',
  height: '34px',
  borderRadius: theme.radius.md,
  background: `linear-gradient(135deg, ${theme.color.primary}, ${theme.color.accent})`,
  color: theme.color.contrast,
  fontWeight: 700,
});

const Navigation = styled.nav({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(1),
});

const NavigationLink = styled(NavLink)({
  padding: `${spacing(2)} ${spacing(3)}`,
  borderRadius: theme.radius.sm,
  color: theme.color.textSecondary,
  fontSize: '14px',
  fontWeight: 500,
  transition: `background ${theme.transition.fast}`,

  '&:hover': {
    background: theme.color.surfaceMuted,
  },

  '&.active': {
    background: theme.color.primaryMuted,
    color: theme.color.primary,
  },
});

const UserBlock = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(3),
  paddingLeft: spacing(4),
  borderLeft: `1px solid ${theme.color.border}`,
});

const UserInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  lineHeight: 1.3,
});

const Avatar = styled.div({
  display: 'grid',
  placeItems: 'center',
  width: '36px',
  height: '36px',
  borderRadius: theme.radius.pill,
  background: theme.color.primaryMuted,
  color: theme.color.primary,
  fontWeight: 700,
  fontSize: '14px',
});

/**
 * Шапка страницы. Все отображаемые данные приходят через пропсы.
 */
export const Header = ({ title, navigation, user, onLogout }: HeaderProps) => {
  return (
    <Root>
      <Inner>
        <Logo>
          <LogoMark>W</LogoMark>
          <Typography variant="h3" as="div">
            {title}
          </Typography>
        </Logo>

        <Navigation aria-label="Основная навигация">
          {navigation.map(({ to, label }) => (
            <NavigationLink key={to} to={to} end={to === '/'}>
              {label}
            </NavigationLink>
          ))}
        </Navigation>

        {user ? (
          <UserBlock>
            <Avatar aria-hidden="true">{user.name.slice(0, 1)}</Avatar>
            <UserInfo>
              <Typography variant="caption">{user.name}</Typography>
              <Typography variant="caption" color="secondary">
                {user.email}
              </Typography>
            </UserInfo>
            <Button variant="ghost" onClick={onLogout}>
              Выйти
            </Button>
          </UserBlock>
        ) : null}
      </Inner>
    </Root>
  );
};
