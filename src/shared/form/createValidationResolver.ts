import { toPlainError, type ValidationResult } from '@astral/validations';
import {
  type FieldErrors,
  type FieldValues,
  type Resolver,
} from 'react-hook-form';

/**
 * Guard из @astral/validations: принимает значение как `unknown`, поэтому тип
 * формы указывается на стороне вызова.
 */
type ValidationGuard = (value: unknown) => ValidationResult;

/**
 * Резолвер react-hook-form поверх @astral/validations.
 *
 * Официальный `@astral/validations-react-hook-form-resolver` зафиксирован на
 * react-hook-form 7.49.2, поэтому связка сделана вручную: guard возвращает
 * дерево ошибок, а `toPlainError` приводит его к формату `FieldErrors`.
 */
export const createValidationResolver = <TValues extends FieldValues>(
  validate: ValidationGuard,
): Resolver<TValues> => {
  return (values) => {
    const validationErrors = toPlainError(validate(values), (error) => ({
      type: 'validation',
      message: error.message,
    }));

    if (!validationErrors) {
      return { values, errors: {} };
    }

    return {
      values: {},
      errors: validationErrors as unknown as FieldErrors<TValues>,
    };
  };
};
