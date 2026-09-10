import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('по умолчанию не отправляет форму', () => {
    render(<Button>Сохранить</Button>);

    expect(screen.getByRole('button', { name: 'Сохранить' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('пропускает явно заданный тип', () => {
    render(<Button type="submit">Войти</Button>);

    expect(screen.getByRole('button', { name: 'Войти' })).toHaveAttribute(
      'type',
      'submit',
    );
  });

  it('сообщает о клике', async () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Перевернуть</Button>);
    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('не реагирует на клик, когда выключена', async () => {
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Сохранение…
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('отдаёт ref: карточка переносит фокус на кнопку после переворота', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<Button ref={ref}>Назад к слову</Button>);
    ref.current?.focus();

    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('передаёт произвольные атрибуты кнопки', () => {
    render(<Button aria-pressed>Learn more</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
});
