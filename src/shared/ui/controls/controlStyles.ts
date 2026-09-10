import { type CSSObject } from '@emotion/react';

import { spacing, theme } from '~/shared/theme';

/**
 * Базовые стили для input, select и textarea.
 */
export const createControlStyle = (isInvalid: boolean): CSSObject => ({
  width: '100%',
  padding: `${spacing(2.5)} ${spacing(3)}`,
  color: theme.color.text,
  background: theme.color.surface,
  border: `1px solid ${isInvalid ? theme.color.danger : theme.color.border}`,
  borderRadius: theme.radius.sm,
  outline: 'none',
  transition: `border-color ${theme.transition.fast}, box-shadow ${theme.transition.fast}`,

  '&:hover:not(:disabled):not(:read-only)': {
    borderColor: theme.color.borderStrong,
  },

  '&:focus': {
    borderColor: isInvalid ? theme.color.danger : theme.color.primary,
    boxShadow: `0 0 0 3px ${
      isInvalid ? theme.color.dangerMuted : theme.color.primaryMuted
    }`,
  },

  '&:disabled, &:read-only': {
    color: theme.color.textDisabled,
    background: theme.color.surfaceMuted,
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    color: theme.color.textDisabled,
  },
});
