import { IS_REMOTE_API_ENABLED } from '~/shared/constants/env';
import { delay } from '~/shared/utils/delay';

import { WORDS_FIXTURE } from './fixtures';
import { httpClient } from './httpClient';

/**
 * Контракт данных слова, приходящих от API.
 */
export type WordDto = {
  id: string;
  word: string;
  translation: string;
  example: string;
};

const FIXTURE_DELAY = 400;

export const getWordsSource = async () => {
  if (!IS_REMOTE_API_ENABLED) {
    await delay(FIXTURE_DELAY);

    return WORDS_FIXTURE;
  }

  const { data } = await httpClient.get<WordDto[]>('/words');

  return data;
};
