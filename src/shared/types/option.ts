/**
 * Вариант выбора для select, radiogroup и группы checkbox-ов.
 */
export type Option<TValue extends string = string> = {
  value: TValue;
  label: string;
};
