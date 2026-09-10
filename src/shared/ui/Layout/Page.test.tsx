import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Page } from './Page';

const CONTACTS = {
  company: 'Word Cards',
  phone: '+7 (900) 000-00-00',
  email: 'hello@word-cards.dev',
  address: 'Калуга, Россия',
};

describe('Page', () => {
  it('собирает каркас из Header, Body и Footer', () => {
    render(
      <MemoryRouter>
        <Page
          title="Word Cards"
          navigation={[{ to: '/cards', label: 'Карточки' }]}
          user={null}
          contacts={CONTACTS}
          onLogout={() => {}}
        >
          <div>Карточки слов</div>
        </Page>
      </MemoryRouter>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('Карточки слов');
  });
});
