import { IS_REMOTE_API_ENABLED } from '~/shared/constants/env';
import { delay } from '~/shared/utils/delay';

import { PROFILE_FIXTURE } from './fixtures';
import { httpClient } from './httpClient';

/**
 * Контракт данных профиля, приходящих от API.
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

const PROFILE_ID = '1';

const FIXTURE_DELAY = 500;

/**
 * Копия фикстуры в памяти: правки профиля сохраняются на время сессии, когда
 * приложение работает без внешнего API.
 */
let localProfile: ProfileDto = PROFILE_FIXTURE;

export const getProfileSource = async () => {
  if (!IS_REMOTE_API_ENABLED) {
    await delay(FIXTURE_DELAY);

    return localProfile;
  }

  const { data } = await httpClient.get<ProfileDto>(`/profile/${PROFILE_ID}`);

  return data;
};

export const updateProfileSource = async (profile: ProfileDto) => {
  if (!IS_REMOTE_API_ENABLED) {
    await delay(FIXTURE_DELAY);
    localProfile = profile;

    return localProfile;
  }

  const { data } = await httpClient.put<ProfileDto>(
    `/profile/${PROFILE_ID}`,
    profile,
  );

  return data;
};
