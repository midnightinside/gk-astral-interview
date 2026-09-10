import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { CardList } from '~/modules/cards/CardList';
import {
  fetchCards,
  selectCards,
  selectCardsError,
  selectIsCardsPending,
} from '~/modules/cards/cardsSlice';
import { spacing } from '~/shared/theme';
import { Alert } from '~/shared/ui/Alert';
import { Loader } from '~/shared/ui/Loader';
import { Typography } from '~/shared/ui/Typography';

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(6),
});

const Heading = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(1),
});

export const CardsScreen = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);
  const isPending = useAppSelector(selectIsCardsPending);
  const errorMessage = useAppSelector(selectCardsError);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <Root>
      <Heading>
        <Typography variant="h1">Карточки слов</Typography>
        <Typography variant="subtitle" color="secondary">
          Нажмите «Learn more», чтобы перевернуть карточку и увидеть перевод.
        </Typography>
      </Heading>

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

      {isPending ? (
        <Loader label="Загружаем карточки…" />
      ) : (
        <CardList cards={cards} />
      )}
    </Root>
  );
};
