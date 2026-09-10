import { type CSSObject } from '@emotion/react';

import { spacing, theme } from '~/shared/theme';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'text';

const VARIANT_STYLE = {
  primary: {
    background: theme.color.primary,
    color: theme.color.contrast,
    borderColor: theme.color.primary,
    hoverBackground: theme.color.primaryHover,
    hoverDecoration: 'none',
  },
  secondary: {
    background: theme.color.surface,
    color: theme.color.primary,
    borderColor: theme.color.borderStrong,
    hoverBackground: theme.color.primaryMuted,
    hoverDecoration: 'none',
  },
  ghost: {
    background: 'transparent',
    color: theme.color.textSecondary,
    borderColor: 'transparent',
    hoverBackground: theme.color.surfaceMuted,
    hoverDecoration: 'none',
  },
  danger: {
    background: theme.color.danger,
    color: theme.color.contrast,
    borderColor: theme.color.danger,
    hoverBackground: '#b93a3a',
    hoverDecoration: 'none',
  },
  /** Кнопка-надпись без подложки: подчёркивается при наведении. */
  text: {
    background: 'transparent',
    color: theme.color.text,
    borderColor: 'transparent',
    hoverBackground: 'transparent',
    hoverDecoration: 'underline',
  },
} as const;

/**
 * Общие стили кнопки: используются и обычной кнопкой, и кнопкой-ссылкой.
 */
export const createButtonStyle = (
  variant: ButtonVariant,
  isFullWidth: boolean,
): CSSObject => {
  const style = VARIANT_STYLE[variant];

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(2),
    width: isFullWidth ? '100%' : 'auto',
    padding: `${spacing(2.5)} ${spacing(5)}`,
    fontFamily: theme.font.family,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0.02em',
    color: style.color,
    background: style.background,
    border: `1px solid ${style.borderColor}`,
    borderRadius: theme.radius.md,
    cursor: 'pointer',
    transition: `background ${theme.transition.fast}, opacity ${theme.transition.fast}`,

    '&:hover:not(:disabled)': {
      background: style.hoverBackground,
      textDecoration: style.hoverDecoration,
    },

    '&:focus-visible': {
      outline: `2px solid ${theme.color.accent}`,
      outlineOffset: '2px',
    },

    '&:disabled': {
      opacity: 0.55,
      cursor: 'not-allowed',
    },
  };
};
