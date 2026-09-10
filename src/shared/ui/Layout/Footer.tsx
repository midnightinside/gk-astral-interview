import styled from '@emotion/styled';

import { spacing, theme } from '~/shared/theme';
import { Typography } from '~/shared/ui/Typography';

export type FooterContacts = {
  company: string;
  phone: string;
  email: string;
  address: string;
};

type FooterProps = {
  contacts: FooterContacts;
};

const Root = styled.footer({
  marginTop: 'auto',
  background: theme.color.surface,
  borderTop: `1px solid ${theme.color.border}`,
});

const Inner = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing(8),
  maxWidth: theme.layout.contentWidth,
  margin: '0 auto',
  padding: `${spacing(8)} ${spacing(5)}`,
});

const Column = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(1),
});

/**
 * Подвал страницы. Контактные данные приходят через пропсы.
 */
export const Footer = ({ contacts }: FooterProps) => {
  return (
    <Root>
      <Inner>
        <Column>
          <Typography variant="overline" color="secondary">
            Компания
          </Typography>
          <Typography variant="body">{contacts.company}</Typography>
          <Typography variant="caption" color="secondary">
            {contacts.address}
          </Typography>
        </Column>

        <Column>
          <Typography variant="overline" color="secondary">
            Контакты
          </Typography>
          <Typography variant="body">{contacts.phone}</Typography>
          <Typography variant="body">{contacts.email}</Typography>
        </Column>

        <Column>
          <Typography variant="overline" color="secondary">
            Проект
          </Typography>
          <Typography variant="caption" color="secondary">
            Тестовое задание, {new Date().getFullYear()}
          </Typography>
        </Column>
      </Inner>
    </Root>
  );
};
