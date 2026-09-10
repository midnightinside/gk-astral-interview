/**
 * Реэкспорт правил валидации @astral/validations через shared слой.
 */

export type { ValidationResult } from '@astral/validations';
export {
  array,
  arrayItem,
  email,
  max,
  min,
  number,
  object,
  onlyNumber,
  optional,
  pattern,
  string,
  transform,
} from '@astral/validations';
