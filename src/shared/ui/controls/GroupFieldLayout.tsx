import styled from '@emotion/styled';
import { type ReactNode } from 'react';

import { spacing, theme } from '~/shared/theme';
import { Typography } from '~/shared/ui/Typography';

type GroupFieldLayoutProps = {
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
  label,
  error,
  hint,
  isDisabled = false,
  children,
}: GroupFieldLayoutProps) => {
  return (
    <Root disabled={isDisabled}>
      <Legend>
        <Typography variant="caption" color="secondary" as="span">
          {label}
        </Typography>
      </Legend>

      <Options>{children}</Options>

      {hint && !error ? (
        <Typography variant="caption" color="secondary">
          {hint}
        </Typography>
      ) : null}

      {error ? (
        <Typography variant="caption" color="danger">
          {error}
        </Typography>
      ) : null}
    </Root>
  );
};
