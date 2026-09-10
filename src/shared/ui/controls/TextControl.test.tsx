import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TextControl } from './TextControl';

describe('TextControl', () => {
  it('отдаёт наружу значение, а не событие', async () => {
    const onChange = vi.fn();

    render(
      <TextControl
        id="profile-city"
        name="city"
        value=""
        onChange={onChange}
      />,
    );
    await userEvent.type(screen.getByRole('textbox'), 'К');

    expect(onChange).toHaveBeenCalledWith('К');
  });

  it('сообщает об ошибке валидации через aria-invalid', () => {
    render(
      <TextControl
        id="profile-city"
        name="city"
        value=""
        isInvalid
        describedBy="profile-city-error"
        onChange={() => {}}
      />,
    );

    const control = screen.getByRole('textbox');

    expect(control).toHaveAttribute('aria-invalid', 'true');
    expect(control).toHaveAttribute('aria-describedby', 'profile-city-error');
  });

  it('заблокированное поле остаётся видимым, но не редактируется', async () => {
    const onChange = vi.fn();

    render(
      <TextControl
        id="profile-timezone"
        name="timezone"
        value="UTC"
        isReadOnly
        onChange={onChange}
      />,
    );
    await userEvent.type(screen.getByRole('textbox'), 'MSK');

    expect(screen.getByRole('textbox')).toHaveValue('UTC');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('поддерживает типы, которые требует задание', () => {
    render(
      <TextControl
        id="profile-age"
        name="age"
        type="number"
        value="30"
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole('spinbutton')).toHaveValue(30);
  });
});
