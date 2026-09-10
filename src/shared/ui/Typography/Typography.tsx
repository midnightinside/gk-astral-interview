import { type CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import { type ElementType, type ReactNode } from 'react';

import { theme } from '~/shared/theme';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'overline';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'contrast'
  | 'danger'
  | 'success';

type TypographyProps = {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: 'left' | 'center' | 'right';
  as?: ElementType;
  /** Нужен, когда на текст ссылается `aria-describedby` контрола. */
  id?: string;
  className?: string;
  children: ReactNode;
};

const VARIANT_TAG: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subtitle: 'p',
  body: 'p',
  caption: 'span',
  overline: 'span',
};

const VARIANT_STYLE: Record<TypographyVariant, CSSObject> = {
  h1: { fontSize: '34px', lineHeight: 1.2, fontWeight: 700 },
  h2: { fontSize: '26px', lineHeight: 1.25, fontWeight: 700 },
  h3: { fontSize: '19px', lineHeight: 1.3, fontWeight: 600 },
  subtitle: { fontSize: '17px', lineHeight: 1.5, fontWeight: 500 },
  body: { fontSize: '15px', lineHeight: 1.6, fontWeight: 400 },
  caption: { fontSize: '13px', lineHeight: 1.45, fontWeight: 400 },
  overline: {
    fontSize: '11px',
    lineHeight: 1.4,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
};

const COLOR_STYLE: Record<TypographyColor, string> = {
  primary: theme.color.text,
  secondary: theme.color.textSecondary,
  contrast: theme.color.contrast,
  danger: theme.color.danger,
  success: theme.color.success,
};

type RootProps = {
  $variant: TypographyVariant;
  $color: TypographyColor;
  $align: 'left' | 'center' | 'right';
};

const Root = styled.span<RootProps>(({ $variant, $color, $align }) => ({
  margin: 0,
  fontFamily: theme.font.family,
  color: COLOR_STYLE[$color],
  textAlign: $align,
  ...VARIANT_STYLE[$variant],
}));

/**
 * Единственный компонент, которому разрешено рендерить текстовые теги.
 *
 * Правило `noRestrictedElements` из `@astral/biomejs-config` запрещает
 * использовать `p`, `span` и заголовки напрямую — вместо них по всему
 * приложению используется `Typography`.
 */
export const Typography = ({
  variant = 'body',
  color = 'primary',
  align = 'left',
  as,
  id,
  className,
  children,
}: TypographyProps) => {
  return (
    <Root
      as={as ?? VARIANT_TAG[variant]}
      $variant={variant}
      $color={color}
      $align={align}
      id={id}
      className={className}
    >
      {children}
    </Root>
  );
};
