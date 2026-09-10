import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  authRepository,
  type Credentials,
  InvalidCredentialsError,
  type Session,
} from '~/data/repositories/authRepository';

type AuthStatus = 'idle' | 'pending' | 'error';

type AuthState = {
  session: Session | null;
  status: AuthStatus;
  error: string | null;
};

const initialState: AuthState = {
  session: authRepository.restoreSession(),
  status: 'idle',
  error: null,
};

const UNEXPECTED_ERROR = 'Не удалось выполнить вход. Попробуйте ещё раз';

export const login = createAsyncThunk<
  Session,
  Credentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    return await authRepository.login(credentials);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue(UNEXPECTED_ERROR);
  }
});

export const logout = createAsyncThunk('auth/logout', () => {
  authRepository.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.session = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload ?? UNEXPECTED_ERROR;
      })
      .addCase(logout.fulfilled, (state) => {
        state.session = null;
        state.status = 'idle';
        state.error = null;
      });
  },
  selectors: {
    selectSession: (state) => state.session,
    selectIsAuthenticated: (state) => state.session !== null,
    selectIsLoginPending: (state) => state.status === 'pending',
    selectAuthError: (state) => state.error,
  },
});

export const { resetAuthError } = authSlice.actions;

export const {
  selectAuthError,
  selectIsAuthenticated,
  selectIsLoginPending,
  selectSession,
} = authSlice.selectors;

export const authReducer = authSlice.reducer;
