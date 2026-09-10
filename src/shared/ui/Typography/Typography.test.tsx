import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Typography } from './Typography';

describe('Typography', () => {
  it('рендерит параграф для варианта по умолчанию', () => {
    render(<Typography>Текст</Typography>);

    expect(screen.getByText('Текст').tagName).toBe('P');
  });

  it('подбирает тег под вариант', () => {
    render(
      <>
        <Typography variant="h1">Заголовок</Typography>
        <Typography variant="caption">Подпись</Typography>
      </>,
    );

    expect(screen.getByText('Заголовок').tagName).toBe('H1');
    expect(screen.getByText('Подпись').tagName).toBe('SPAN');
  });

  it('позволяет заменить тег через `as`, сохранив оформление варианта', () => {
    render(
      <Typography variant="h2" as="h1">
        Вход
      </Typography>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Вход' }),
    ).toBeInTheDocument();
  });

  it('проставляет id: на него ссылается aria-describedby контрола', () => {
    render(<Typography id="field-hint">Подсказка</Typography>);

    expect(screen.getByText('Подсказка')).toHaveAttribute('id', 'field-hint');
  });
});
