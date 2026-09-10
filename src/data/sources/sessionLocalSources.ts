/**
 * Источник данных сессии — localStorage.
 *
 * Позволяет сохранять авторизацию между перезагрузками страницы.
 */
export type SessionDto = {
  token: string;
  name: string;
  email: string;
  login: string;
};

const STORAGE_KEY = 'word-cards:session';

export const readSessionSource = (): SessionDto | null => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as SessionDto;
  } catch {
    localStorage.removeItem(STORAGE_KEY);

    return null;
  }
};

export const writeSessionSource = (session: SessionDto) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

export const clearSessionSource = () => {
  localStorage.removeItem(STORAGE_KEY);
};
