import { type Option } from '~/shared/types/option';

export const COUNTRY_OPTIONS: Option[] = [
  { value: 'russia', label: 'Россия' },
  { value: 'belarus', label: 'Беларусь' },
  { value: 'kazakhstan', label: 'Казахстан' },
  { value: 'armenia', label: 'Армения' },
];

export const TIMEZONE_OPTIONS: Option[] = [
  { value: 'msk', label: 'MSK (UTC+3)' },
  { value: 'yekt', label: 'YEKT (UTC+5)' },
  { value: 'novt', label: 'NOVT (UTC+7)' },
  { value: 'vlat', label: 'VLAT (UTC+10)' },
  { value: 'utc', label: 'UTC' },
];

export const POSITION_OPTIONS: Option[] = [
  { value: 'frontend', label: 'Frontend-разработчик' },
  { value: 'fullstack', label: 'Fullstack-разработчик' },
  { value: 'lead', label: 'Тимлид' },
  { value: 'qa', label: 'QA-инженер' },
];

export const EMPLOYMENT_TYPE_OPTIONS: Option[] = [
  { value: 'full', label: 'Полная занятость' },
  { value: 'partial', label: 'Частичная занятость' },
  { value: 'project', label: 'Проектная работа' },
];

export const SKILL_OPTIONS: Option[] = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'redux', label: 'Redux' },
  { value: 'mobx', label: 'MobX' },
  { value: 'testing', label: 'Тестирование' },
];

export const LANGUAGE_OPTIONS: Option[] = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'Английский' },
  { value: 'de', label: 'Немецкий' },
  { value: 'zh', label: 'Китайский' },
];

export const PREFERRED_CONTACT_OPTIONS: Option[] = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Телефон' },
  { value: 'telegram', label: 'Telegram' },
];

/**
 * Значения, участвующие в связях полей.
 */
export const PROJECT_EMPLOYMENT = 'project';

export const TELEGRAM_CONTACT = 'telegram';

export const RUSSIA_COUNTRY = 'russia';

export const UTC_TIMEZONE = 'utc';

export const PROJECT_WORK_SCHEDULE = 'По договорённости';
