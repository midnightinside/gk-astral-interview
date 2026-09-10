import { describe, expect, it } from 'vitest';

import { getDescribedBy, getErrorId, getHintId } from './fieldDescription';

describe('fieldDescription', () => {
  it('строит идентификаторы от идентификатора контрола', () => {
    expect(getHintId('profile-age')).toBe('profile-age-hint');
    expect(getErrorId('profile-age')).toBe('profile-age-error');
  });

  it('ссылается на подсказку, пока ошибки нет', () => {
    const describedBy = getDescribedBy({
      controlId: 'profile-age',
      hasHint: true,
      hasError: false,
    });

    expect(describedBy).toBe('profile-age-hint');
  });

  it('переключается на ошибку: на экране подсказки уже нет', () => {
    const describedBy = getDescribedBy({
      controlId: 'profile-age',
      hasHint: true,
      hasError: true,
    });

    expect(describedBy).toBe('profile-age-error');
  });

  it('не ссылается ни на что, когда описывать нечего', () => {
    const describedBy = getDescribedBy({
      controlId: 'profile-age',
      hasHint: false,
      hasError: false,
    });

    expect(describedBy).toBeUndefined();
  });
});
