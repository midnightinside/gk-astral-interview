import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { Header } from './Header';

const NAVIGATION = [
  { to: '/', label: 'Главная' },
  { to: '/cards', label: 'Карточки' },
];

const renderWithRouter = (ui: ReactNode, route = '/') => {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe('Header', () => {
  it('рендерит переданные через пропсы заголовок и навигацию', () => {
    renderWithRouter(
      <Header
        title="Word Cards"
        navigation={NAVIGATION}
        user={null}
        onLogout={() => {}}
      />,
    );

    expect(screen.getByText('Word Cards')).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Основная навигация' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Карточки' })).toHaveAttribute(
      'href',
      '/cards',
    );
  });

  it('подсвечивает активный маршрут', () => {
    renderWithRouter(
      <Header
        title="Word Cards"
        navigation={NAVIGATION}
        user={null}
        onLogout={() => {}}
      />,
      '/cards',
    );

    expect(screen.getByRole('link', { name: 'Карточки' })).toHaveClass(
      'active',
    );
    expect(screen.getByRole('link', { name: 'Главная' })).not.toHaveClass(
      'active',
    );
  });

  it('прячет блок пользователя, пока сессии нет', () => {
    renderWithRouter(
      <Header
        title="Word Cards"
        navigation={NAVIGATION}
        user={null}
        onLogout={() => {}}
      />,
    );

    expect(
      screen.queryByRole('button', { name: 'Выйти' }),
    ).not.toBeInTheDocument();
  });

  it('показывает данные пользователя и сообщает о выходе', async () => {
    const onLogout = vi.fn();

    renderWithRouter(
      <Header
        title="Word Cards"
        navigation={NAVIGATION}
        user={{ name: 'Артём Васильев', email: 'admin@word-cards.dev' }}
        onLogout={onLogout}
      />,
    );

    expect(screen.getByText('Артём Васильев')).toBeInTheDocument();
    expect(screen.getByText('admin@word-cards.dev')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Выйти' }));

    expect(onLogout).toHaveBeenCalledOnce();
  });
});
