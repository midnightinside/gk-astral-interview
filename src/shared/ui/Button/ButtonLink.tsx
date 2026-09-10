import styled from '@emotion/styled';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { type ButtonVariant, createButtonStyle } from './buttonStyles';

type ButtonLinkProps = {
  to: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
};

const Root = styled(Link, {
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{
  $variant: ButtonVariant;
  $fullWidth: boolean;
}>(({ $variant, $fullWidth }) => createButtonStyle($variant, $fullWidth));

/**
 * Ссылка с оформлением кнопки: избавляет от вложения button внутрь a.
 */
export const ButtonLink = ({
  to,
  variant = 'primary',
  fullWidth = false,
  children,
}: ButtonLinkProps) => {
  return (
    <Root to={to} $variant={variant} $fullWidth={fullWidth}>
      {children}
    </Root>
  );
};
