import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '~/modules/auth/authSlice';
import { cardsReducer } from '~/modules/cards/cardsSlice';
import { profileReducer } from '~/modules/profile/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
    profile: profileReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
