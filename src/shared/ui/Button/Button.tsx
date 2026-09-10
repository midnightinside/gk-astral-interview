import styled from '@emotion/styled';
import { type ButtonHTMLAttributes, type Ref } from 'react';

import { type ButtonVariant, createButtonStyle } from './buttonStyles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

const Root = styled.button<{
  $variant: ButtonVariant;
  $fullWidth: boolean;
}>(({ $variant, $fullWidth }) => createButtonStyle($variant, $fullWidth));

export const Button = ({
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  children,
  ...restProps
}: ButtonProps) => {
  return (
    <Root $variant={variant} $fullWidth={fullWidth} type={type} {...restProps}>
      {children}
    </Root>
  );
};
