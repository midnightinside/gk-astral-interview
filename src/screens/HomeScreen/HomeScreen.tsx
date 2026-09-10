import styled from '@emotion/styled';

import { ROUTES } from '~/app/routes';
import { spacing, theme } from '~/shared/theme';
import { ButtonLink } from '~/shared/ui/Button';
import { Typography } from '~/shared/ui/Typography';

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(10),
});

const Hero = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(4),
  maxWidth: '720px',
});

const Actions = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing(3),
  marginTop: spacing(2),
});

const Features = styled.section({
  display: 'grid',
  gap: spacing(5),
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
});

const FeatureCard = styled.article({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(2),
  padding: spacing(5),
  background: theme.color.surface,
  border: `1px solid ${theme.color.border}`,
  borderRadius: theme.radius.lg,
  boxShadow: theme.shadow.sm,
});

const FEATURES = [
  {
    title: 'Карточки слов',
    description:
      'Двусторонние карточки с примером употребления. Клик по кнопке переворачивает карточку и показывает перевод.',
  },
  {
    title: 'Авторизация',
    description:
      'Разделы за формой входа. Сессия сохраняется между перезагрузками страницы.',
  },
  {
    title: 'Профиль',
    description:
      'Форма из двадцати полей со связями: часть полей скрывается или блокируется в зависимости от выбранных значений.',
  },
];

export const HomeScreen = () => {
  return (
    <Root>
      <Hero>
        <Typography variant="overline" color="secondary">
          Тестовое задание · Frontend
        </Typography>
        <Typography variant="h1">
          Word Cards — приложение для изучения иностранных слов
        </Typography>
        <Typography variant="subtitle" color="secondary">
          Single Page Application на React, Redux Toolkit и TypeScript. Работа с
          данными изолирована в слое repositories, поэтому источник данных
          заменяется без правок интерфейса.
        </Typography>
        <Actions>
          <ButtonLink to={ROUTES.cards}>Открыть карточки</ButtonLink>
          <ButtonLink to={ROUTES.login} variant="secondary">
            Войти в профиль
          </ButtonLink>
        </Actions>
      </Hero>

      <Features>
        {FEATURES.map(({ title, description }) => (
          <FeatureCard key={title}>
            <Typography variant="h3">{title}</Typography>
            <Typography variant="caption" color="secondary">
              {description}
            </Typography>
          </FeatureCard>
        ))}
      </Features>
    </Root>
  );
};
