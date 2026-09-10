import { withFixtureFallback } from './fixtureFallback';
import { USER_FIXTURE } from './fixtures';
import { httpClient, isNotFoundError } from './httpClient';
import { readSessionSource } from './sessionLocalSources';

/**
 * Контракт данных профиля в ресурсе `users`.
 */
export type ProfileDto = {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  age: number | null;
  email: string;
  phone: string;
  country: string;
  city: string;
  timezone: string;
  position: string;
  experienceYears: number | null;
  employmentType: string;
  salary: number | null;
  workSchedule: string;
  skills: string[];
  languages: string[];
  preferredContact: string;
  telegram: string;
  about: string;
};

/**
 * Контракт данных пользователя.
 *
 * Бесплатный тариф mockapi.io даёт два ресурса, поэтому профиль вложен в
 * запись пользователя, а не вынесен в отдельный ресурс.
 */
export type UserDto = {
  id: string;
  login: string;
  password: string;
  name: string;
  email: string;
  profile: ProfileDto;
};

/**
 * Профиль в памяти: правки сохраняются на время сессии, когда приложение
 * работает на фикстурах.
 */
let localProfile: ProfileDto = USER_FIXTURE.profile;

/**
 * Идентификатор профиля совпадает с идентификатором записи пользователя.
 */
const toProfileDto = (user: UserDto): ProfileDto => ({
  ...user.profile,
  id: user.id,
});

const requestUserByLogin = async (login: string) => {
  try {
    const { data } = await httpClient.get<UserDto[]>('/users', {
      params: { login },
    });

    return data.at(0);
  } catch (error) {
    if (isNotFoundError(error)) {
      return undefined;
    }

    throw error;
  }
};

export const findUserByLoginSource = (login: string) => {
  return withFixtureFallback<UserDto | undefined>(
    () => requestUserByLogin(login),
    () => (USER_FIXTURE.login === login ? USER_FIXTURE : undefined),
  );
};

/**
 * Профиль запрашивается по логину текущей сессии.
 *
 * Выбирать первую запись коллекции нельзя: мок-сервис может содержать записи,
 * созданные автоматически по схеме ресурса.
 */
export const getProfileSource = () => {
  return withFixtureFallback<ProfileDto>(
    async () => {
      const session = readSessionSource();
      const user = session
        ? await requestUserByLogin(session.login)
        : undefined;

      if (!user) {
        throw new Error('Профиль пользователя не найден в мок-сервисе');
      }

      return toProfileDto(user);
    },
    () => localProfile,
  );
};

export const updateProfileSource = (profile: ProfileDto) => {
  return withFixtureFallback<ProfileDto>(
    async () => {
      const { data: user } = await httpClient.get<UserDto>(
        `/users/${profile.id}`,
      );

      const { data: updatedUser } = await httpClient.put<UserDto>(
        `/users/${profile.id}`,
        { ...user, profile },
      );

      return toProfileDto(updatedUser);
    },
    () => {
      localProfile = profile;

      return localProfile;
    },
  );
};
