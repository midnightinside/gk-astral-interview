import {
  COUNTRY_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  LANGUAGE_OPTIONS,
  POSITION_OPTIONS,
  PREFERRED_CONTACT_OPTIONS,
  SKILL_OPTIONS,
  TIMEZONE_OPTIONS,
} from './constants';
import { type ProfileFieldDescriptor } from './types';

/**
 * Описание 20 полей формы профиля.
 *
 * Схема декларативна: `EditView` не знает про конкретные поля, он рендерит
 * список дескрипторов через компонент `Field`.
 */
export const PROFILE_FIELDS: ProfileFieldDescriptor[] = [
  {
    name: 'lastName',
    label: 'Фамилия',
    type: 'text',
    placeholder: 'Васильев',
    autoComplete: 'family-name',
  },
  {
    name: 'firstName',
    label: 'Имя',
    type: 'text',
    placeholder: 'Артём',
    autoComplete: 'given-name',
  },
  {
    name: 'middleName',
    label: 'Отчество',
    type: 'text',
    placeholder: 'Сергеевич',
    hint: 'Необязательное поле',
  },
  {
    name: 'birthDate',
    label: 'Дата рождения',
    type: 'date',
  },
  {
    name: 'age',
    label: 'Возраст',
    type: 'number',
    placeholder: '30',
    hint: 'От 14 до 120 лет',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'name@example.com',
    autoComplete: 'email',
  },
  {
    name: 'phone',
    label: 'Телефон',
    type: 'text',
    placeholder: '+7 900 000-00-00',
    autoComplete: 'tel',
  },
  {
    name: 'country',
    label: 'Страна',
    type: 'select',
    options: COUNTRY_OPTIONS,
    hint: 'Влияет на доступность часового пояса',
  },
  {
    name: 'city',
    label: 'Город',
    type: 'text',
    placeholder: 'Калуга',
  },
  {
    name: 'timezone',
    label: 'Часовой пояс',
    type: 'select',
    options: TIMEZONE_OPTIONS,
  },
  {
    name: 'position',
    label: 'Должность',
    type: 'select',
    options: POSITION_OPTIONS,
  },
  {
    name: 'experienceYears',
    label: 'Опыт работы, лет',
    type: 'number',
    placeholder: '5',
    hint: 'От 0 до 60',
  },
  {
    name: 'employmentType',
    label: 'Тип занятости',
    type: 'radioGroup',
    options: EMPLOYMENT_TYPE_OPTIONS,
    hint: 'Проектная работа скрывает оклад и фиксирует график',
  },
  {
    name: 'salary',
    label: 'Ожидаемый оклад, ₽',
    type: 'number',
    placeholder: '250000',
  },
  {
    name: 'workSchedule',
    label: 'График работы',
    type: 'text',
    placeholder: '5/2, гибкое начало дня',
  },
  {
    name: 'skills',
    label: 'Навыки',
    type: 'checkboxGroup',
    options: SKILL_OPTIONS,
    hint: 'Выберите хотя бы один навык',
  },
  {
    name: 'languages',
    label: 'Языки',
    type: 'checkboxGroup',
    options: LANGUAGE_OPTIONS,
  },
  {
    name: 'preferredContact',
    label: 'Предпочтительный способ связи',
    type: 'radioGroup',
    options: PREFERRED_CONTACT_OPTIONS,
    hint: 'Выбор Telegram открывает дополнительное поле',
  },
  {
    name: 'telegram',
    label: 'Telegram',
    type: 'text',
    placeholder: '@username',
  },
  {
    name: 'about',
    label: 'О себе',
    type: 'textarea',
    placeholder: 'Коротко о профессиональном опыте',
  },
];
