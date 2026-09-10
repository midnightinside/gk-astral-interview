import styled from '@emotion/styled';
import { useEffect } from 'react';

import {
  createValidationResolver,
  type SubmitHandler,
  useForm,
  useWatch,
} from '~/shared/form/form';
import { spacing, theme } from '~/shared/theme';
import { Alert } from '~/shared/ui/Alert';
import { Button } from '~/shared/ui/Button';
import { Typography } from '~/shared/ui/Typography';

import { Field } from '../Field';
import { PROFILE_FIELDS } from '../fieldsSchema';
import { validateProfile } from '../profileValidation';
import { getFieldState, getForcedValues } from '../relations';
import { type ProfileFieldName, type ProfileFormValues } from '../types';

type EditViewProps = {
  defaultValues: ProfileFormValues;
  isSaving: boolean;
  isSaved: boolean;
  errorMessage: string | null;
  onSubmit: (values: ProfileFormValues) => void;
};

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(6),
  padding: spacing(6),
  background: theme.color.surface,
  border: `1px solid ${theme.color.border}`,
  borderRadius: theme.radius.lg,
  boxShadow: theme.shadow.sm,
});

const Grid = styled.div({
  display: 'grid',
  gap: spacing(5),
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  alignItems: 'start',
});

const Actions = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(4),
  paddingTop: spacing(2),
  borderTop: `1px solid ${theme.color.border}`,
});

/**
 * Форма редактирования профиля.
 *
 * Поля рендерятся из схемы, связи между ними вычисляются в `relations`:
 * скрытие, блокировка и предустановленные значения.
 */
export const EditView = ({
  defaultValues,
  isSaving,
  isSaved,
  errorMessage,
  onSubmit,
}: EditViewProps) => {
  const { control, handleSubmit, setValue, reset, formState } =
    useForm<ProfileFormValues>({
      defaultValues,
      resolver: createValidationResolver<ProfileFormValues>(validateProfile),
      mode: 'onBlur',
    });

  const watchedValues = useWatch({ control });

  const values = { ...defaultValues, ...watchedValues } as ProfileFormValues;

  useEffect(() => {
    const forcedValues = getForcedValues(values);

    for (const [name, value] of Object.entries(forcedValues)) {
      setValue(name as ProfileFieldName, value, { shouldValidate: true });
    }
  }, [values, setValue]);

  useEffect(() => {
    if (isSaved) {
      reset(undefined, { keepValues: true, keepDirty: false });
    }
  }, [isSaved, reset]);

  const submit: SubmitHandler<ProfileFormValues> = (formValues) => {
    onSubmit(formValues);
  };

  return (
    <Form onSubmit={handleSubmit(submit)} noValidate>
      <Grid>
        {PROFILE_FIELDS.map((descriptor) => {
          const { isVisible, isDisabled } = getFieldState(
            descriptor.name,
            values,
          );

          if (!isVisible) {
            return null;
          }

          return (
            <Field
              key={descriptor.name}
              descriptor={descriptor}
              control={control}
              isDisabled={isDisabled}
            />
          );
        })}
      </Grid>

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

      {isSaved && !formState.isDirty ? (
        <Alert severity="success">Изменения профиля сохранены</Alert>
      ) : null}

      <Actions>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Сохранение…' : 'Сохранить изменения'}
        </Button>
        <Typography variant="caption" color="secondary">
          Полей в форме: {PROFILE_FIELDS.length}
        </Typography>
      </Actions>
    </Form>
  );
};
