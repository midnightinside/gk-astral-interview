import { type Profile } from '~/data/repositories/profileRepository';

import { type ProfileFormValues } from './types';

const toInputValue = (value: number | null) => {
  return value === null ? '' : String(value);
};

const toNullableNumber = (value: string) => {
  return value.trim() === '' ? null : Number(value);
};

export const toFormValues = (profile: Profile): ProfileFormValues => ({
  lastName: profile.lastName,
  firstName: profile.firstName,
  middleName: profile.middleName,
  birthDate: profile.birthDate,
  age: toInputValue(profile.age),
  email: profile.email,
  phone: profile.phone,
  country: profile.country,
  city: profile.city,
  timezone: profile.timezone,
  position: profile.position,
  experienceYears: toInputValue(profile.experienceYears),
  employmentType: profile.employmentType,
  salary: toInputValue(profile.salary),
  workSchedule: profile.workSchedule,
  skills: profile.skills,
  languages: profile.languages,
  preferredContact: profile.preferredContact,
  telegram: profile.telegram,
  about: profile.about,
});

export const toProfile = (id: string, values: ProfileFormValues): Profile => ({
  id,
  lastName: values.lastName,
  firstName: values.firstName,
  middleName: values.middleName,
  birthDate: values.birthDate,
  age: toNullableNumber(values.age),
  email: values.email,
  phone: values.phone,
  country: values.country,
  city: values.city,
  timezone: values.timezone,
  position: values.position,
  experienceYears: toNullableNumber(values.experienceYears),
  employmentType: values.employmentType,
  salary: toNullableNumber(values.salary),
  workSchedule: values.workSchedule,
  skills: values.skills,
  languages: values.languages,
  preferredContact: values.preferredContact,
  telegram: values.telegram,
  about: values.about,
});
