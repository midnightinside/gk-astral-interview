import {
  getProfileSource,
  type ProfileDto,
  updateProfileSource,
} from '~/data/sources/usersSources';

/**
 * Профиль в терминах приложения.
 */
export type Profile = {
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
 * Мок-сервисы возвращают числа как строки, поэтому значение нормализуется.
 */
const toNullableNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : null;
};

const toStringList = (value: unknown): string[] => {
  return Array.isArray(value) ? value.map(String) : [];
};

const toProfile = (dto: ProfileDto): Profile => ({
  ...dto,
  id: String(dto.id),
  age: toNullableNumber(dto.age),
  experienceYears: toNullableNumber(dto.experienceYears),
  salary: toNullableNumber(dto.salary),
  skills: toStringList(dto.skills),
  languages: toStringList(dto.languages),
});

export const profileRepository = {
  getProfile: async (): Promise<Profile> => {
    const dto = await getProfileSource();

    return toProfile(dto);
  },

  updateProfile: async (profile: Profile): Promise<Profile> => {
    const dto = await updateProfileSource(profile);

    return toProfile(dto);
  },
};
