import styled from '@emotion/styled';
import { useState } from 'react';

import { spacing, theme } from '~/shared/theme';
import { Button } from '~/shared/ui/Button';
import { Typography } from '~/shared/ui/Typography';

type CardProps = {
  title: string;
  word: string;
  example: string;
  translation: string;
};

const CARD_HEIGHT = '270px';

const Scene = styled.div({
  height: CARD_HEIGHT,
  perspective: '1400px',
});

const Inner = styled.div<{ $isFlipped: boolean }>(({ $isFlipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
  transition: `transform ${theme.transition.slow}`,
  transform: $isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
}));

const Face = styled.div({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(3),
  padding: spacing(5),
  borderRadius: theme.radius.lg,
  boxShadow: theme.shadow.md,
  backfaceVisibility: 'hidden',
  overflow: 'hidden',
});

const FrontFace = styled(Face)({
  background: theme.color.surface,
  border: `1px solid ${theme.color.border}`,
});

const BackFace = styled(Face)({
  transform: 'rotateY(180deg)',
  background: `linear-gradient(150deg, ${theme.color.primary}, ${theme.color.accent})`,
  border: `1px solid ${theme.color.primary}`,
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(2),
  flexGrow: 1,
});

const Divider = styled.div({
  width: '48px',
  height: '3px',
  borderRadius: theme.radius.pill,
  background: theme.color.primary,
});

/**
 * Карточка слова. Все данные приходят через пропсы.
 *
 * Клик по кнопке действия переворачивает карточку и показывает перевод,
 * повторный клик возвращает лицевую сторону.
 */
export const Card = ({ title, word, example, translation }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggle = () => {
    setIsFlipped((previous) => !previous);
  };

  return (
    <Scene>
      <Inner $isFlipped={isFlipped}>
        <FrontFace inert={isFlipped}>
          <Typography variant="overline" color="secondary">
            {title}
          </Typography>
          <Content>
            <Typography variant="h2">{word}</Typography>
            <Divider />
            <Typography variant="caption" color="secondary">
              {example}
            </Typography>
          </Content>
          <Button variant="secondary" onClick={toggle}>
            Learn more
          </Button>
        </FrontFace>

        <BackFace inert={!isFlipped}>
          <Typography variant="overline" color="contrast">
            Перевод
          </Typography>
          <Content>
            <Typography variant="h3" color="contrast">
              {word}
            </Typography>
            <Typography variant="subtitle" color="contrast">
              {translation}
            </Typography>
          </Content>
          <Button variant="secondary" onClick={toggle}>
            Назад к слову
          </Button>
        </BackFace>
      </Inner>
    </Scene>
  );
};
