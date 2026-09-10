import { type Option } from '~/shared/types/option';

/**
 * Значения формы профиля.
 *
 * Числовые поля хранятся строками — так их отдаёт DOM. Приведение к числам
 * выполняет слой data при отправке в API.
 */
export type ProfileFormValues = {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  age: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  timezone: string;
  position: string;
  experienceYears: string;
  employmentType: string;
  salary: string;
  workSchedule: string;
  skills: string[];
  languages: string[];
  preferredContact: string;
  telegram: string;
  about: string;
};

export type ProfileFieldName = keyof ProfileFormValues;

export type ProfileFieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'textarea'
  | 'select'
  | 'checkboxGroup'
  | 'radioGroup';

export type ProfileFieldDescriptor = {
  name: ProfileFieldName;
  label: string;
  type: ProfileFieldType;
  placeholder?: string;
  hint?: string;
  options?: Option[];
  autoComplete?: string;
};
