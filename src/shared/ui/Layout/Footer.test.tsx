import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Footer } from './Footer';

const CONTACTS = {
  company: 'Word Cards',
  phone: '+7 (900) 000-00-00',
  email: 'hello@word-cards.dev',
  address: 'Калуга, Россия',
};

describe('Footer', () => {
  it('рендерит контакты из пропсов', () => {
    render(<Footer contacts={CONTACTS} />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(CONTACTS.company)).toBeInTheDocument();
    expect(screen.getByText(CONTACTS.phone)).toBeInTheDocument();
    expect(screen.getByText(CONTACTS.email)).toBeInTheDocument();
    expect(screen.getByText(CONTACTS.address)).toBeInTheDocument();
  });
});
