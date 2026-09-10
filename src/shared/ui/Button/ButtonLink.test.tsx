import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ButtonLink } from './ButtonLink';

describe('ButtonLink', () => {
  it('остаётся ссылкой, а не кнопкой', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/cards">Открыть карточки</ButtonLink>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('link', { name: 'Открыть карточки' }),
    ).toHaveAttribute('href', '/cards');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('не пропускает служебные пропсы в разметку', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/login" variant="secondary" fullWidth>
          Войти в профиль
        </ButtonLink>
      </MemoryRouter>,
    );

    const link = screen.getByRole('link');

    expect(link).not.toHaveAttribute('$variant');
    expect(link).not.toHaveAttribute('$fullWidth');
  });
});
