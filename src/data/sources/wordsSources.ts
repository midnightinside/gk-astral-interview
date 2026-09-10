import { withFixtureFallback } from './fixtureFallback';
import { WORDS_FIXTURE } from './fixtures';
import { httpClient } from './httpClient';

/**
 * Контракт данных слова, приходящих от API.
 */
export type WordDto = {
  id: string;
  word: string;
  /** Слово, разбитое на слоги: `be·nev·o·lent`. */
  syllables: string;
  partOfSpeech: string;
  definition: string;
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
