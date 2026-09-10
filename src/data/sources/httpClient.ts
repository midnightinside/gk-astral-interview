import axios from 'axios';
import axiosRetry from 'axios-retry';

import { API_BASE_URL } from '~/shared/constants/env';

/**
 * Единая точка доступа к сети.
 *
 * `axios-retry` повторяет только идемпотентные запросы и сетевые сбои, поэтому
 * повторная отправка формы профиля невозможна.
 */
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(httpClient, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
});
