import { IS_REMOTE_API_ENABLED } from '~/shared/constants/env';
import { delay } from '~/shared/utils/delay';

import { USER_FIXTURE } from './fixtures';
import { httpClient } from './httpClient';

/**
 * Контракт данных пользователя, приходящих от API.
 */
export type UserDto = {
  id: string;
  login: string;
  password: string;
  name: string;
  email: string;
};

const FIXTURE_DELAY = 500;

/**
 * Поиск пользователя по логину.
 *
 * mockapi.io поддерживает фильтрацию коллекции query-параметром, поэтому
 * проверка учётных данных опирается на данные из источника, а не на константы
 * внутри приложения.
 */
export const findUserByLoginSource = async (login: string) => {
  if (!IS_REMOTE_API_ENABLED) {
    await delay(FIXTURE_DELAY);

    return USER_FIXTURE.login === login ? USER_FIXTURE : undefined;
  }

  const { data } = await httpClient.get<UserDto[]>('/users', {
    params: { login },
  });

  return data.at(0);
};
