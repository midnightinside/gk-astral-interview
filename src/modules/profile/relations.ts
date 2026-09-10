import {
  PROJECT_EMPLOYMENT,
  PROJECT_WORK_SCHEDULE,
  RUSSIA_COUNTRY,
  TELEGRAM_CONTACT,
  UTC_TIMEZONE,
} from './constants';
import { type ProfileFieldName, type ProfileFormValues } from './types';

export type FieldState = {
  isVisible: boolean;
  isDisabled: boolean;
};

type FieldRule = {
  isVisible?: (values: ProfileFormValues) => boolean;
  isDisabled?: (values: ProfileFormValues) => boolean;
  /** Значение, которое подставляется принудительно, пока поле недоступно. */
  forcedValue?: (values: ProfileFormValues) => string | null;
};

const isForeignCountry = ({ country }: ProfileFormValues) => {
  return country !== '' && country !== RUSSIA_COUNTRY;
};

const isProjectEmployment = ({ employmentType }: ProfileFormValues) => {
  return employmentType === PROJECT_EMPLOYMENT;
};

/**
 * Связи между полями — «продвинутый уровень» задания.
 *
 * - `employmentType = Проектная работа` скрывает «Ожидаемый оклад» и делает
 *   «График работы» недоступным с предустановленным значением;
 * - `preferredContact = Telegram` показывает поле «Telegram»;
 * - страна, отличная от России, блокирует «Часовой пояс» со значением UTC.
 */
const FIELD_RULES: Partial<Record<ProfileFieldName, FieldRule>> = {
  salary: {
    isVisible: (values) => !isProjectEmployment(values),
  },
  workSchedule: {
    isDisabled: isProjectEmployment,
    forcedValue: (values) =>
      isProjectEmployment(values) ? PROJECT_WORK_SCHEDULE : null,
  },
  telegram: {
    isVisible: (values) => values.preferredContact === TELEGRAM_CONTACT,
  },
  timezone: {
    isDisabled: isForeignCountry,
    forcedValue: (values) => (isForeignCountry(values) ? UTC_TIMEZONE : null),
  },
};

export const getFieldState = (
  name: ProfileFieldName,
  values: ProfileFormValues,
): FieldState => {
  const rule = FIELD_RULES[name];

  return {
    isVisible: rule?.isVisible?.(values) ?? true,
    isDisabled: rule?.isDisabled?.(values) ?? false,
  };
};

/**
 * Значения, которые нужно подставить в заблокированные поля.
 */
export const getForcedValues = (values: ProfileFormValues) => {
  const entries = Object.entries(FIELD_RULES) as [
    ProfileFieldName,
    FieldRule,
  ][];

  return entries.reduce<Partial<Record<ProfileFieldName, string>>>(
    (accumulator, [name, rule]) => {
      const forcedValue = rule.forcedValue?.(values) ?? null;

      if (forcedValue !== null && values[name] !== forcedValue) {
        accumulator[name] = forcedValue;
      }

      return accumulator;
    },
    {},
  );
};
