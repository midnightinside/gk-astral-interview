import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FieldLayout } from './FieldLayout';
import { TextControl } from './TextControl';

const renderField = (props: { hint?: string; error?: string }) => {
  return render(
    <FieldLayout controlId="profile-city" label="Город" {...props}>
      <TextControl
        id="profile-city"
        name="city"
        value="Калуга"
        describedBy={props.error ? 'profile-city-error' : 'profile-city-hint'}
        onChange={() => {}}
      />
    </FieldLayout>,
  );
};

describe('FieldLayout', () => {
  it('связывает подпись с контролом', () => {
    renderField({});

    expect(screen.getByLabelText('Город')).toHaveValue('Калуга');
  });

  it('связывает подсказку с полем через aria-describedby', () => {
    renderField({ hint: 'Город проживания' });

    expect(screen.getByLabelText('Город')).toHaveAccessibleDescription(
      'Город проживания',
    );
  });

  it('заменяет подсказку ошибкой, чтобы озвучивалось видимое', () => {
    renderField({ hint: 'Город проживания', error: 'Поле обязательно' });

    expect(screen.queryByText('Город проживания')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Город')).toHaveAccessibleDescription(
      'Поле обязательно',
    );
  });
});
