import styled from '@emotion/styled';
import { type ReactNode } from 'react';

import { spacing } from '~/shared/theme';
import { Typography } from '~/shared/ui/Typography';

type FieldLayoutProps = {
  /** Идентификатор контрола, с которым связывается подпись. */
  controlId: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(1.5),
});

const LabelText = styled.label({
  display: 'block',
});

/**
 * Обёртка поля: подпись, контрол, подсказка и текст ошибки.
 */
export const FieldLayout = ({
  controlId,
  label,
  error,
  hint,
  children,
}: FieldLayoutProps) => {
  return (
    <Root>
      <LabelText htmlFor={controlId}>
        <Typography variant="caption" color="secondary" as="span">
          {label}
        </Typography>
      </LabelText>

      {children}

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
