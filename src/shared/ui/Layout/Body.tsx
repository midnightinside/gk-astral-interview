import styled from '@emotion/styled';
import { type ReactNode } from 'react';

import { spacing, theme } from '~/shared/theme';

type BodyProps = {
  children: ReactNode;
};

const Root = styled.main({
  width: '100%',
  maxWidth: theme.layout.contentWidth,
  margin: '0 auto',
  padding: `${spacing(8)} ${spacing(5)} ${spacing(12)}`,

  [`@media (max-width: ${theme.breakpoint.sm})`]: {
    padding: `${spacing(6)} ${spacing(4)} ${spacing(10)}`,
  },
});

/**
 * Полезная нагрузка страницы: список карточек, форма профиля и т.д.
 */
export const Body = ({ children }: BodyProps) => {
  return <Root>{children}</Root>;
};
