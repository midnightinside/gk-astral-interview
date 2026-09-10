import { withFixtureFallback } from './fixtureFallback';
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

export const getWordsSource = () => {
  return withFixtureFallback<WordDto[]>(
    async () => {
      const { data } = await httpClient.get<WordDto[]>('/words');

      return data;
    },
    () => WORDS_FIXTURE,
  );
};
