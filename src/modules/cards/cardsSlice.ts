import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  type Word,
  wordsRepository,
} from '~/data/repositories/wordsRepository';
import { pickRandom } from '~/shared/utils/pickRandom';

import { FALLBACK_TITLE, MOTIVATIONAL_TITLES } from './constants';

/**
 * Карточка слова: данные слова плюс мотивирующий заголовок.
 */
export type WordCard = Word & {
  title: string;
};

type CardsStatus = 'idle' | 'pending' | 'error';

type CardsState = {
  items: WordCard[];
  status: CardsStatus;
  error: string | null;
};

const initialState: CardsState = {
  items: [],
  status: 'idle',
  error: null,
};

const LOAD_ERROR = 'Не удалось загрузить карточки';

const toWordCard = (word: Word): WordCard => ({
  ...word,
  title: pickRandom(MOTIVATIONAL_TITLES, FALLBACK_TITLE),
});

export const fetchCards = createAsyncThunk<
  WordCard[],
  void,
  { rejectValue: string }
>('cards/fetch', async (_, { rejectWithValue }) => {
  try {
    const words = await wordsRepository.getWords();

    return words.map(toWordCard);
  } catch {
    return rejectWithValue(LOAD_ERROR);
  }
});

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload ?? LOAD_ERROR;
      });
  },
  selectors: {
    selectCards: (state) => state.items,
    selectIsCardsPending: (state) => state.status === 'pending',
    selectCardsError: (state) => state.error,
  },
});

export const { selectCards, selectCardsError, selectIsCardsPending } =
  cardsSlice.selectors;

export const cardsReducer = cardsSlice.reducer;
