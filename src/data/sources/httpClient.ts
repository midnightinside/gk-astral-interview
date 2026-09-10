import axios, { HttpStatusCode } from 'axios';
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

/**
 * Отсутствие записи — не сбой сети.
 *
 * mockapi.io отвечает 404 на пустую выборку по фильтру, поэтому такой ответ
 * нужно отличать от недоступности сервиса.
 */
export const isNotFoundError = (error: unknown) => {
  return (
    axios.isAxiosError(error) &&
    error.response?.status === HttpStatusCode.NotFound
  );
};
