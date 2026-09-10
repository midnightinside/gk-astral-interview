import {
  array,
  email,
  max,
  min,
  number,
  object,
  onlyNumber,
  optional,
  string,
  transform,
} from '~/shared/form/validation';

import { type ProfileFormValues } from './types';

const numericString = (minValue: number, maxValue: number) =>
  string(
    onlyNumber(),
    transform(
      (value: string) => Number(value),
      number(min(minValue), max(maxValue)),
    ),
  );

/**
 * Схема валидации формы профиля на @astral/validations.
 *
 * Числовые поля приходят строками, поэтому перед проверкой диапазона значение
 * приводится к числу через `transform`.
 */
export const validateProfile = object<ProfileFormValues>({
  lastName: string(min(2), max(60)),
  firstName: string(min(2), max(60)),
  middleName: optional(string(max(60))),
  birthDate: string(),
  age: numericString(14, 120),
  email: string(email()),
  phone: string(min(10), max(20)),
  country: string(),
  city: string(min(2), max(60)),
  timezone: string(),
  position: string(),
  experienceYears: numericString(0, 60),
  employmentType: string(),
  salary: optional(string(onlyNumber())),
  workSchedule: optional(string(max(120))),
  skills: array(min(1)),
  languages: optional(array()),
  preferredContact: string(),
  telegram: optional(string(max(40))),
  about: optional(string(max(500))),
});
