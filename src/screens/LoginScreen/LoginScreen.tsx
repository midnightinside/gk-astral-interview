import styled from '@emotion/styled';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { ROUTES } from '~/app/routes';
import {
  login,
  selectAuthError,
  selectIsAuthenticated,
  selectIsLoginPending,
} from '~/modules/auth/authSlice';
import { LoginForm, type LoginFormValues } from '~/modules/auth/LoginForm';
import { spacing } from '~/shared/theme';

const Root = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: `${spacing(6)} 0`,
});

export const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isPending = useAppSelector(selectIsLoginPending);
  const errorMessage = useAppSelector(selectAuthError);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.cards} replace />;
  }

  const submit = (values: LoginFormValues) => {
    dispatch(login(values));
  };

  return (
    <Root>
      <LoginForm
        isPending={isPending}
        errorMessage={errorMessage}
        onSubmit={submit}
      />
    </Root>
  );
};
