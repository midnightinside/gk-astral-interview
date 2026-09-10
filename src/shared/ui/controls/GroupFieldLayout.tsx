import styled from '@emotion/styled';
import { type ReactNode } from 'react';

import { spacing, theme } from '~/shared/theme';
import { Typography } from '~/shared/ui/Typography';

import { getDescribedBy, getErrorId, getHintId } from './fieldDescription';

type GroupFieldLayoutProps = {
  /** Идентификатор группы: от него строятся id подсказки и ошибки. */
  controlId: string;
  label: string;
  error?: string;
  hint?: string;
  isDisabled?: boolean;
  children: ReactNode;
};

const Root = styled.fieldset({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(2),
  margin: 0,
  padding: `${spacing(3)} ${spacing(4)}`,
  border: `1px solid ${theme.color.border}`,
  borderRadius: theme.radius.sm,
  background: theme.color.surface,

  '&:disabled': {
    background: theme.color.surfaceMuted,
  },
});

const Legend = styled.legend({
  padding: `0 ${spacing(1)}`,
});

const Options = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: `${spacing(2)} ${spacing(5)}`,
});

/**
 * Обёртка для группы checkbox-ов и radiogroup: семантический fieldset+legend.
 */
export const GroupFieldLayout = ({
  controlId,
  label,
  error,
  hint,
  isDisabled = false,
  children,
}: GroupFieldLayoutProps) => {
  return (
    <Root
      disabled={isDisabled}
      aria-describedby={getDescribedBy({
        controlId,
        hasHint: Boolean(hint),
        hasError: Boolean(error),
      })}
    >
      <Legend>
        <Typography variant="caption" color="secondary" as="span">
          {label}
        </Typography>
      </Legend>

      <Options>{children}</Options>

      {hint && !error ? (
        <Typography
          variant="caption"
          color="secondary"
          id={getHintId(controlId)}
        >
          {hint}
        </Typography>
      ) : null}

      {error ? (
        <Typography variant="caption" color="danger" id={getErrorId(controlId)}>
          {error}
        </Typography>
      ) : null}
    </Root>
  );
};
