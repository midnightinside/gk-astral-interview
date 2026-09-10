import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { EditView } from '~/modules/profile/EditView';
import { toFormValues } from '~/modules/profile/profileMapper';
import {
  fetchProfile,
  saveProfile,
  selectIsProfilePending,
  selectIsProfileSaved,
  selectIsProfileSaving,
  selectProfile,
  selectProfileError,
} from '~/modules/profile/profileSlice';
import { type ProfileFormValues } from '~/modules/profile/types';
import { spacing } from '~/shared/theme';
import { Typography } from '~/shared/ui/Typography';

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(6),
});

const Heading = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(1),
});

/** Обёртка нужна, чтобы сообщение о загрузке попало в живую область. */
const Status = styled.div({
  display: 'flex',
});

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const isPending = useAppSelector(selectIsProfilePending);
  const isSaving = useAppSelector(selectIsProfileSaving);
  const isSaved = useAppSelector(selectIsProfileSaved);
  const errorMessage = useAppSelector(selectProfileError);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const submit = (values: ProfileFormValues) => {
    if (!profile) {
      return;
    }

    dispatch(saveProfile({ id: profile.id, values }));
  };

  return (
    <Root>
      <Heading>
        <Typography variant="h1">Профиль</Typography>
        <Typography variant="subtitle" color="secondary">
          Часть полей зависит от выбранных значений: смотрите «Тип занятости»,
          «Страна» и «Предпочтительный способ связи».
        </Typography>
      </Heading>

      {isPending && !profile ? (
        <Status role="status">
          <Typography variant="body" color="secondary">
            Загружаем профиль…
          </Typography>
        </Status>
      ) : null}

      {profile ? (
        <EditView
          key={profile.id}
          defaultValues={toFormValues(profile)}
          isSaving={isSaving}
          isSaved={isSaved}
          errorMessage={errorMessage}
          onSubmit={submit}
        />
      ) : null}
    </Root>
  );
};
