import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  type Profile,
  profileRepository,
} from '~/data/repositories/profileRepository';

import { toProfile } from './profileMapper';
import { type ProfileFormValues } from './types';

type LoadStatus = 'idle' | 'pending' | 'error';

type SaveStatus = 'idle' | 'pending' | 'success' | 'error';

type ProfileState = {
  profile: Profile | null;
  loadStatus: LoadStatus;
  saveStatus: SaveStatus;
  error: string | null;
};

const initialState: ProfileState = {
  profile: null,
  loadStatus: 'idle',
  saveStatus: 'idle',
  error: null,
};

const LOAD_ERROR = 'Не удалось загрузить профиль';

const SAVE_ERROR = 'Не удалось сохранить профиль';

export const fetchProfile = createAsyncThunk<
  Profile,
  void,
  { rejectValue: string }
>('profile/fetch', async (_, { rejectWithValue }) => {
  try {
    return await profileRepository.getProfile();
  } catch {
    return rejectWithValue(LOAD_ERROR);
  }
});

export const saveProfile = createAsyncThunk<
  Profile,
  { id: string; values: ProfileFormValues },
  { rejectValue: string }
>('profile/save', async ({ id, values }, { rejectWithValue }) => {
  try {
    return await profileRepository.updateProfile(toProfile(id, values));
  } catch {
    return rejectWithValue(SAVE_ERROR);
  }
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loadStatus = 'pending';
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loadStatus = 'idle';
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loadStatus = 'error';
        state.error = action.payload ?? LOAD_ERROR;
      })
      .addCase(saveProfile.pending, (state) => {
        state.saveStatus = 'pending';
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.saveStatus = 'success';
        state.profile = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.saveStatus = 'error';
        state.error = action.payload ?? SAVE_ERROR;
      });
  },
  selectors: {
    selectProfile: (state) => state.profile,
    selectIsProfilePending: (state) => state.loadStatus === 'pending',
    selectIsProfileSaving: (state) => state.saveStatus === 'pending',
    selectIsProfileSaved: (state) => state.saveStatus === 'success',
    selectProfileError: (state) => state.error,
  },
});

export const {
  selectIsProfilePending,
  selectIsProfileSaved,
  selectIsProfileSaving,
  selectProfile,
  selectProfileError,
} = profileSlice.selectors;

export const profileReducer = profileSlice.reducer;
