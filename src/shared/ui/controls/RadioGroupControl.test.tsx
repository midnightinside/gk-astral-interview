import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RadioGroupControl } from './RadioGroupControl';

const OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Телефон' },
  { value: 'telegram', label: 'Telegram' },
];

describe('RadioGroupControl', () => {
  it('отмечает только текущее значение', () => {
    render(
      <RadioGroupControl
        name="contact"
        value="email"
        options={OPTIONS}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole('radio', { name: 'Email' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Telegram' })).not.toBeChecked();
  });

  it('сообщает о выборе варианта', async () => {
    const onChange = vi.fn();

    render(
      <RadioGroupControl
        name="contact"
        value="email"
        options={OPTIONS}
        onChange={onChange}
      />,
    );
    await userEvent.click(screen.getByRole('radio', { name: 'Telegram' }));

    expect(onChange).toHaveBeenCalledWith('telegram');
  });

  it('не переключается, когда группа выключена', async () => {
    const onChange = vi.fn();

    render(
      <RadioGroupControl
        name="contact"
        value="email"
        options={OPTIONS}
        isDisabled
        onChange={onChange}
      />,
    );
    await userEvent.click(screen.getByRole('radio', { name: 'Telegram' }));

    expect(onChange).not.toHaveBeenCalled();
  });
});
