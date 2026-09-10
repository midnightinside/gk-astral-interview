import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  type Word,
  wordsRepository,
} from '~/data/repositories/wordsRepository';
import { pickRandom } from '~/shared/utils/pickRandom';
import {
  type RequestStatus,
  shouldRequest,
} from '~/shared/utils/requestStatus';

import { FALLBACK_TITLE, MOTIVATIONAL_TITLES } from './constants';

/**
 * Карточка слова: данные слова плюс мотивирующий заголовок.
 */
export type WordCard = Word & {
  title: string;
};

type CardsState = {
  items: WordCard[];
  status: RequestStatus;
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

/**
 * Слова обезличены и меняются только при правке мок-сервиса, поэтому
 * загружаются один раз за жизнь страницы: `condition` отменяет повторный
 * запрос, если данные уже получены или запрос ещё выполняется.
 */
export const fetchCards = createAsyncThunk<
  WordCard[],
  void,
  { state: { cards: CardsState }; rejectValue: string }
>(
  'cards/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const words = await wordsRepository.getWords();

      return words.map(toWordCard);
    } catch {
      return rejectWithValue(LOAD_ERROR);
    }
  },
  {
    condition: (_, { getState }) => shouldRequest(getState().cards.status),
  },
);

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
        state.status = 'success';
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
