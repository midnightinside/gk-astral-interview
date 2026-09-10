import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Alert } from './Alert';

describe('Alert', () => {
  it('объявляет ошибку немедленно через role="alert"', () => {
    render(<Alert severity="error">Вход невозможен</Alert>);

    expect(screen.getByRole('alert')).toHaveTextContent('Вход невозможен');
  });

  it('объявляет успех и нейтральные сообщения через role="status"', () => {
    render(<Alert severity="success">Профиль сохранён</Alert>);

    expect(screen.getByRole('status')).toHaveTextContent('Профиль сохранён');
  });

  it('по умолчанию считает сообщение информационным', () => {
    render(<Alert>Данные загружены из фикстур</Alert>);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
