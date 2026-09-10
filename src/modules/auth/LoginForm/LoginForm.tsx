import styled from '@emotion/styled';

import {
  Controller,
  createValidationResolver,
  type SubmitHandler,
  useForm,
} from '~/shared/form/form';
import { min, object, string } from '~/shared/form/validation';
import { spacing, theme } from '~/shared/theme';
import { Alert } from '~/shared/ui/Alert';
import { Button } from '~/shared/ui/Button';
import { FieldLayout, TextControl } from '~/shared/ui/controls';
import { Typography } from '~/shared/ui/Typography';

export type LoginFormValues = {
  login: string;
  password: string;
};

type LoginFormProps = {
  isPending: boolean;
  errorMessage: string | null;
  onSubmit: (values: LoginFormValues) => void;
};

const validateLoginForm = object<LoginFormValues>({
  login: string(min(3)),
  password: string(min(3)),
});

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(5),
  width: '100%',
  maxWidth: '380px',
  padding: spacing(7),
  background: theme.color.surface,
  border: `1px solid ${theme.color.border}`,
  borderRadius: theme.radius.lg,
  boxShadow: theme.shadow.md,
});

const Heading = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(1),
});

export const LoginForm = ({
  isPending,
  errorMessage,
  onSubmit,
}: LoginFormProps) => {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: { login: '', password: '' },
    resolver: createValidationResolver<LoginFormValues>(validateLoginForm),
    mode: 'onSubmit',
  });

  const submit: SubmitHandler<LoginFormValues> = (values) => {
    onSubmit(values);
  };

  return (
    <Form onSubmit={handleSubmit(submit)} noValidate>
      <Heading>
        <Typography variant="h2">Вход</Typography>
        <Typography variant="caption" color="secondary">
          Тестовые данные: admin / admin
        </Typography>
      </Heading>

      <Controller
        control={control}
        name="login"
        render={({ field, fieldState }) => (
          <FieldLayout
            controlId="login"
            label="Логин"
            error={fieldState.error?.message}
          >
            <TextControl
              id="login"
              name={field.name}
              value={field.value}
              autoComplete="username"
              placeholder="admin"
              isInvalid={Boolean(fieldState.error)}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </FieldLayout>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <FieldLayout
            controlId="password"
            label="Пароль"
            error={fieldState.error?.message}
          >
            <TextControl
              id="password"
              name={field.name}
              type="password"
              value={field.value}
              autoComplete="current-password"
              placeholder="admin"
              isInvalid={Boolean(fieldState.error)}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </FieldLayout>
        )}
      />

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

      <Button type="submit" fullWidth disabled={isPending}>
        {isPending ? 'Проверяем…' : 'Войти'}
      </Button>
    </Form>
  );
};
