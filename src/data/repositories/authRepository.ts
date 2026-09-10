import {
  clearSessionSource,
  readSessionSource,
  type SessionDto,
  writeSessionSource,
} from '~/data/sources/sessionLocalSources';
import { findUserByLoginSource } from '~/data/sources/usersSources';

export type Credentials = {
  login: string;
  password: string;
};

export type Session = {
  token: string;
  user: {
    login: string;
    name: string;
    email: string;
  };
};

/**
 * Ошибка неверных учётных данных.
 *
 * Отдельный тип позволяет слою modules отличать её от сетевых сбоев.
 */
export class InvalidCredentialsError extends Error {
  public constructor() {
    super('Вход невозможен: неправильные логин или пароль');
    this.name = 'InvalidCredentialsError';
  }
}

const toSession = ({ token, login, name, email }: SessionDto): Session => ({
  token,
  user: { login, name, email },
});

export const authRepository = {
  login: async ({ login, password }: Credentials): Promise<Session> => {
    const user = await findUserByLoginSource(login);

    if (!user || user.password !== password) {
      throw new InvalidCredentialsError();
    }

    const session: SessionDto = {
      token: crypto.randomUUID(),
      login: user.login,
      name: user.name,
      email: user.email,
    };

    writeSessionSource(session);

    return toSession(session);
  },

  /**
   * Восстановление сессии после перезагрузки страницы.
   */
  restoreSession: (): Session | null => {
    const session = readSessionSource();

    return session ? toSession(session) : null;
  },

  logout: () => {
    clearSessionSource();
  },
};
