import styled from '@emotion/styled';
import { type ReactNode } from 'react';

import { spacing, theme } from '~/shared/theme';
import { Typography } from '~/shared/ui/Typography';

export type AlertSeverity = 'error' | 'success' | 'info';

type AlertProps = {
  severity?: AlertSeverity;
  children: ReactNode;
};

const SEVERITY_STYLE = {
  error: {
    background: theme.color.dangerMuted,
    border: theme.color.danger,
  },
  success: {
    background: theme.color.successMuted,
    border: theme.color.success,
  },
  info: {
    background: theme.color.primaryMuted,
    border: theme.color.primary,
  },
} as const;

const Root = styled.div<{ $severity: AlertSeverity }>(({ $severity }) => ({
  padding: `${spacing(3)} ${spacing(4)}`,
  background: SEVERITY_STYLE[$severity].background,
  borderLeft: `3px solid ${SEVERITY_STYLE[$severity].border}`,
  borderRadius: theme.radius.sm,
}));

export const Alert = ({ severity = 'info', children }: AlertProps) => {
  return (
    <Root $severity={severity} role="alert">
      <Typography
        variant="caption"
        color={severity === 'error' ? 'danger' : 'primary'}
      >
        {children}
      </Typography>
    </Root>
  );
};
