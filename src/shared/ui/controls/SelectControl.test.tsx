import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SelectControl } from './SelectControl';

const OPTIONS = [
  { value: 'full', label: 'Полная занятость' },
  { value: 'project', label: 'Проектная работа' },
];

describe('SelectControl', () => {
  it('добавляет пустой пункт к переданным вариантам', () => {
    render(
      <SelectControl
        id="profile-employment"
        name="employment"
        value=""
        options={OPTIONS}
        onChange={() => {}}
      />,
    );

    expect(screen.getAllByRole('option')).toHaveLength(OPTIONS.length + 1);
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  it('отдаёт наружу значение выбранного варианта', async () => {
    const onChange = vi.fn();

    render(
      <SelectControl
        id="profile-employment"
        name="employment"
        value=""
        options={OPTIONS}
        onChange={onChange}
      />,
    );
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      'Проектная работа',
    );

    expect(onChange).toHaveBeenCalledWith('project');
  });

  it('показывает свой текст вместо пункта по умолчанию', () => {
    render(
      <SelectControl
        id="profile-employment"
        name="employment"
        value=""
        options={OPTIONS}
        placeholder="Выберите тип"
        onChange={() => {}}
      />,
    );

    expect(
      screen.getByRole('option', { name: 'Выберите тип' }),
    ).toBeInTheDocument();
  });
});
