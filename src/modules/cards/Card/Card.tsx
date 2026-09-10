import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import { spacing, theme } from '~/shared/theme';
import { Button } from '~/shared/ui/Button';
import { Typography } from '~/shared/ui/Typography';

type CardProps = {
  title: string;
  word: string;
  syllables: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  translation: string;
};

const Scene = styled.div({
  perspective: '1400px',
});

const Inner = styled.div<{ $isFlipped: boolean }>(({ $isFlipped }) => ({
  /**
   * Обе стороны лежат в одной ячейке сетки, поэтому высота карточки равна
   * высоте более длинной стороны — фиксированная высота не нужна.
   */
  display: 'grid',
  height: '100%',
  transformStyle: 'preserve-3d',
  transition: `transform ${theme.transition.slow}`,
  transform: $isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
}));

const Face = styled.div({
  gridArea: '1 / 1',
  display: 'flex',
  flexDirection: 'column',
  padding: spacing(5),
  borderRadius: theme.radius.lg,
  boxShadow: theme.shadow.md,
  backfaceVisibility: 'hidden',
});

const FrontFace = styled(Face)({
  background: theme.color.surface,
  border: `1px solid ${theme.color.border}`,
});

const BackFace = styled(Face)({
  transform: 'rotateY(180deg)',
  background: theme.color.primaryMuted,
  border: `1px solid ${theme.color.primary}`,
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: spacing(2),
});

/**
 * Слово набирается обычным начертанием крупным кеглем — как в примере из
 * задания, где слово разбито на слоги: `be·nev·o·lent`.
 */
const WordText = styled(Typography)({
  fontSize: '30px',
  fontWeight: 400,
  lineHeight: 1.2,
});

/** Кнопка действия выключена из общей сетки отступов и выровнена по тексту. */
const ActionButton = styled(Button)({
  alignSelf: 'flex-start',
  padding: `${spacing(2)} 0`,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

/**
 * Карточка слова. Все данные приходят через пропсы.
 *
 * Клик по кнопке действия переворачивает карточку и показывает перевод,
 * повторный клик возвращает лицевую сторону.
 */
export const Card = ({
  title,
  word,
  syllables,
  partOfSpeech,
  definition,
  example,
  translation,
}: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const isToggled = useRef(false);

  /**
   * Скрытая сторона карточки помечается `inert`, поэтому браузер сбрасывает
   * фокус с нажатой кнопки в начало документа. Фокус переносится на кнопку
   * открывшейся стороны, чтобы не терять место на странице.
   */
  useEffect(() => {
    if (!isToggled.current) {
      return;
    }

    const target = isFlipped ? backButton.current : frontButton.current;

    target?.focus();
  }, [isFlipped]);

  const toggle = () => {
    isToggled.current = true;
    setIsFlipped((previous) => !previous);
  };

  return (
    <Scene>
      <Inner $isFlipped={isFlipped}>
        <FrontFace inert={isFlipped}>
          <Content>
            <Typography variant="caption" color="secondary">
              {title}
            </Typography>
            <WordText>{syllables}</WordText>
            <Typography variant="caption" color="secondary">
              {partOfSpeech}
            </Typography>
            <Typography variant="body">{definition}</Typography>
            <Typography variant="body">“{example}”</Typography>
          </Content>

          <ActionButton
            ref={frontButton}
            variant="text"
            aria-pressed={isFlipped}
            onClick={toggle}
          >
            Learn more
          </ActionButton>
        </FrontFace>

        <BackFace inert={!isFlipped}>
          <Content>
            <Typography variant="caption" color="secondary">
              Перевод
            </Typography>
            <WordText>{word}</WordText>
            <Typography variant="caption" color="secondary">
              {partOfSpeech}
            </Typography>
            <Typography variant="body">{translation}</Typography>
          </Content>

          <ActionButton
            ref={backButton}
            variant="text"
            aria-pressed={isFlipped}
            onClick={toggle}
          >
            Назад к слову
          </ActionButton>
        </BackFace>
      </Inner>
    </Scene>
  );
};
