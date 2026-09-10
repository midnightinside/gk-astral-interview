export type RequestStatus = 'idle' | 'pending' | 'success' | 'error';

/**
 * Правило кэширования запросов.
 *
 * Данные запрашиваются, если их ещё не загружали или прошлая попытка
 * закончилась ошибкой. Пока запрос в полёте или данные уже получены, повторный
 * запрос не нужен.
 */
export const shouldRequest = (status: RequestStatus) => {
  return status === 'idle' || status === 'error';
};
