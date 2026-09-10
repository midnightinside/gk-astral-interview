import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { spacing, theme } from '~/shared/theme';
import { Typography } from '~/shared/ui/Typography';

type LoaderProps = {
  /** Текст рядом со спиннером: он же объявляется в живой области. */
  label?: string;
};

const spin = keyframes({
  to: {
    transform: 'rotate(360deg)',
  },
});

const Root = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing(3),
  padding: `${spacing(10)} 0`,
  color: theme.color.primary,
});

/**
 * Спиннер декоративный: смысл несёт текст рядом, поэтому от программ чтения
 * экрана кольцо скрыто.
 *
 * Анимация выключается при `prefers-reduced-motion` — глобальный сброс
 * обнуляет только длительность, а бесконечное вращение нужно снимать целиком.
 * Вместо дуги в этом режиме показывается ровное кольцо.
 */
const Circle = styled.div({
  width: '20px',
  height: '20px',
  border: `2px solid ${theme.color.border}`,
  borderTopColor: 'currentColor',
  borderRadius: theme.radius.pill,
  animation: `${spin} 900ms linear infinite`,

  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
    borderColor: 'currentColor',
    opacity: 0.4,
  },
});

/**
 * Индикатор загрузки для страниц: сам является живой областью, поэтому
 * оборачивать его в `role="status"` не нужно.
 */
export const Loader = ({ label = 'Загрузка…' }: LoaderProps) => {
  return (
    <Root role="status">
      <Circle aria-hidden />
      <Typography variant="body" color="secondary">
        {label}
      </Typography>
    </Root>
  );
};
