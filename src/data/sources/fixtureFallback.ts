import { IS_REMOTE_API_ENABLED } from '~/shared/constants/env';
import { delay } from '~/shared/utils/delay';

const FIXTURE_DELAY = 450;

/**
 * Единая точка выбора источника данных.
 *
 * Пока `VITE_API_BASE_URL` не задан, работают локальные фикстуры с имитацией
 * сетевой задержки. Если внешний мок-сервис задан, но недоступен (лимит
 * запросов, удалённый проект), запрос молча откатывается на фикстуры —
 * приложение остаётся работоспособным.
 */
export const withFixtureFallback = async <TResult>(
  request: () => Promise<TResult>,
  fixture: () => TResult,
): Promise<TResult> => {
  if (!IS_REMOTE_API_ENABLED) {
    await delay(FIXTURE_DELAY);

    return fixture();
  }

  try {
    return await request();
  } catch {
    return fixture();
  }
};
