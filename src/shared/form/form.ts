/**
 * Реэкспорт react-hook-form через shared слой.
 *
 * Конфигурация `@astral/biomejs-config` запрещает импортировать
 * react-hook-form напрямую в слоях `screens` и `modules`: приложение должно
 * зависеть от собственной абстракции, а не от конкретной библиотеки форм.
 */

export type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
export { Controller, useForm, useWatch } from 'react-hook-form';

export { createValidationResolver } from './createValidationResolver';
