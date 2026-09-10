import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CheckboxGroupControl } from './CheckboxGroupControl';

const OPTIONS = [
  { value: 'ts', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'redux', label: 'Redux' },
];

describe('CheckboxGroupControl', () => {
  it('отмечает варианты из значения', () => {
    render(
      <CheckboxGroupControl
        name="skills"
        value={['ts']}
        options={OPTIONS}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole('checkbox', { name: 'TypeScript' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'React' })).not.toBeChecked();
  });

  it('добавляет вариант к значению', async () => {
    const onChange = vi.fn();

    render(
      <CheckboxGroupControl
        name="skills"
        value={['ts']}
        options={OPTIONS}
        onChange={onChange}
      />,
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'React' }));

    expect(onChange).toHaveBeenCalledWith(['ts', 'react']);
  });

  it('убирает вариант из значения', async () => {
    const onChange = vi.fn();

    render(
      <CheckboxGroupControl
        name="skills"
        value={['ts', 'react']}
        options={OPTIONS}
        onChange={onChange}
      />,
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'TypeScript' }));

    expect(onChange).toHaveBeenCalledWith(['react']);
  });
});
