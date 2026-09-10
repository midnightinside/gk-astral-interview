const env = import.meta.env as { VITE_API_BASE_URL?: string };

/**
 * Базовый URL мок-API.
 *
 * Пустое значение переключает `data/sources` на локальные фикстуры, поэтому
 * приложение остаётся работоспособным без внешнего сервиса.
 */
export const API_BASE_URL = env.VITE_API_BASE_URL?.trim() ?? '';

export const IS_REMOTE_API_ENABLED = API_BASE_URL.length > 0;
