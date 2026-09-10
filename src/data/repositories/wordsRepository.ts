import { getWordsSource } from '~/data/sources/wordsSources';

/**
 * Слово в терминах приложения.
 */
export type Word = {
  id: string;
  word: string;
  syllables: string;
  partOfSpeech: string;
  definition: string;
  translation: string;
  example: string;
};

/**
 * Repository защищает приложение от изменений API: наружу отдаётся модель
 * приложения, а не DTO.
 */
export const wordsRepository = {
  getWords: async (): Promise<Word[]> => {
    const words = await getWordsSource();

    return words.map(
      ({
        id,
        word,
        syllables,
        partOfSpeech,
        definition,
        translation,
        example,
      }) => ({
        id: String(id),
        word,
        syllables,
        partOfSpeech,
        definition,
        translation,
        example,
      }),
    );
  },
};
