import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Loader } from './Loader';

describe('Loader', () => {
  it('сам является живой областью', () => {
    render(<Loader />);

    expect(screen.getByRole('status')).toHaveTextContent('Загрузка…');
  });

  it('показывает переданную подпись', () => {
    render(<Loader label="Загружаем карточки…" />);

    expect(screen.getByRole('status')).toHaveTextContent('Загружаем карточки…');
  });

  it('прячет кольцо спиннера от программ чтения экрана', () => {
    render(<Loader label="Загружаем профиль…" />);

    const status = screen.getByRole('status');

    expect(status.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
    expect(status.textContent).toBe('Загружаем профиль…');
  });
});
