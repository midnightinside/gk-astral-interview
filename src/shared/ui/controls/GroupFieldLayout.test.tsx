import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { GroupFieldLayout } from './GroupFieldLayout';
import { RadioGroupControl } from './RadioGroupControl';

const OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'telegram', label: 'Telegram' },
];

const renderGroup = (props: {
  hint?: string;
  error?: string;
  isDisabled?: boolean;
}) => {
  return render(
    <GroupFieldLayout
      controlId="profile-contact"
      label="Предпочтительный способ связи"
      {...props}
    >
      <RadioGroupControl
        name="contact"
        value="email"
        options={OPTIONS}
        isDisabled={props.isDisabled}
        onChange={() => {}}
      />
    </GroupFieldLayout>,
  );
};

describe('GroupFieldLayout', () => {
  it('оборачивает группу в fieldset с legend', () => {
    renderGroup({});

    expect(
      screen.getByRole('group', { name: 'Предпочтительный способ связи' }),
    ).toBeInTheDocument();
  });

  it('связывает подсказку с группой целиком', () => {
    renderGroup({ hint: 'Выбор Telegram открывает дополнительное поле' });

    expect(screen.getByRole('group')).toHaveAccessibleDescription(
      'Выбор Telegram открывает дополнительное поле',
    );
  });

  it('заменяет подсказку ошибкой', () => {
    renderGroup({
      hint: 'Выбор Telegram открывает дополнительное поле',
      error: 'Выберите способ связи',
    });

    expect(screen.getByRole('group')).toHaveAccessibleDescription(
      'Выберите способ связи',
    );
  });

  it('выключает вложенные контролы вместе с группой', () => {
    renderGroup({ isDisabled: true });

    expect(screen.getByRole('radio', { name: 'Email' })).toBeDisabled();
  });
});
