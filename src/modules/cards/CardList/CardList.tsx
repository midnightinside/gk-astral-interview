import styled from '@emotion/styled';

import { spacing } from '~/shared/theme';

import { Card } from '../Card';
import { type WordCard } from '../cardsSlice';

type CardListProps = {
  cards: WordCard[];
};

const Grid = styled.div({
  display: 'grid',
  gap: spacing(5),
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
});

/**
 * Список карточек. Массив данных приходит через пропсы, рендер каждой карточки
 * делегируется компоненту `Card`.
 */
export const CardList = ({ cards }: CardListProps) => {
  return (
    <Grid>
      {cards.map(
        ({
          id,
          title,
          word,
          syllables,
          partOfSpeech,
          definition,
          example,
          translation,
        }) => (
          <Card
            key={id}
            title={title}
            word={word}
            syllables={syllables}
            partOfSpeech={partOfSpeech}
            definition={definition}
            example={example}
            translation={translation}
          />
        ),
      )}
    </Grid>
  );
};
