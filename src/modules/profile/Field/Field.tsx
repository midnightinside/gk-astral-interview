import { type Control, Controller } from '~/shared/form/form';
import {
  CheckboxGroupControl,
  FieldLayout,
  GroupFieldLayout,
  getDescribedBy,
  RadioGroupControl,
  SelectControl,
  TextAreaControl,
  TextControl,
  type TextControlType,
} from '~/shared/ui/controls';

import {
  type ProfileFieldDescriptor,
  type ProfileFieldType,
  type ProfileFormValues,
} from '../types';

type FieldProps = {
  descriptor: ProfileFieldDescriptor;
  control: Control<ProfileFormValues>;
  isDisabled: boolean;
};

const TEXT_CONTROL_TYPE: Partial<Record<ProfileFieldType, TextControlType>> = {
  text: 'text',
  number: 'number',
  date: 'date',
};

const GROUP_TYPES: ProfileFieldType[] = ['checkboxGroup', 'radioGroup'];

/**
 * Рендер одного поля профиля по его дескриптору.
 *
 * Компонент не знает про конкретные поля формы: тип контрола, подпись и
 * варианты выбора приходят из схемы.
 */
export const Field = ({ descriptor, control, isDisabled }: FieldProps) => {
  const controlId = `profile-${descriptor.name}`;
  const isGroup = GROUP_TYPES.includes(descriptor.type);

  return (
    <Controller
      control={control}
      name={descriptor.name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;
        const options = descriptor.options ?? [];
        const describedBy = getDescribedBy({
          controlId,
          hasHint: Boolean(descriptor.hint),
          hasError: Boolean(error),
        });

        if (isGroup) {
          return (
            <GroupFieldLayout
              controlId={controlId}
              label={descriptor.label}
              hint={descriptor.hint}
              error={error}
              isDisabled={isDisabled}
            >
              {descriptor.type === 'checkboxGroup' ? (
                <CheckboxGroupControl
                  name={field.name}
                  value={field.value as string[]}
                  options={options}
                  isDisabled={isDisabled}
                  onChange={field.onChange}
                />
              ) : (
                <RadioGroupControl
                  name={field.name}
                  value={field.value as string}
                  options={options}
                  isDisabled={isDisabled}
                  onChange={field.onChange}
                />
              )}
            </GroupFieldLayout>
          );
        }

        return (
          <FieldLayout
            controlId={controlId}
            label={descriptor.label}
            hint={descriptor.hint}
            error={error}
          >
            {descriptor.type === 'textarea' ? (
              <TextAreaControl
                id={controlId}
                name={field.name}
                value={field.value as string}
                placeholder={descriptor.placeholder}
                isDisabled={isDisabled}
                isInvalid={Boolean(error)}
                describedBy={describedBy}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            ) : null}

            {descriptor.type === 'select' ? (
              <SelectControl
                id={controlId}
                name={field.name}
                value={field.value as string}
                options={options}
                isDisabled={isDisabled}
                isInvalid={Boolean(error)}
                describedBy={describedBy}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            ) : null}

            {TEXT_CONTROL_TYPE[descriptor.type] ? (
              <TextControl
                id={controlId}
                name={field.name}
                type={TEXT_CONTROL_TYPE[descriptor.type]}
                value={field.value as string}
                placeholder={descriptor.placeholder}
                autoComplete={descriptor.autoComplete}
                isDisabled={isDisabled}
                isInvalid={Boolean(error)}
                describedBy={describedBy}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            ) : null}
          </FieldLayout>
        );
      }}
    />
  );
};
