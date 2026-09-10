import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

/**
 * Автоочистка Testing Library включается только при `globals: true`. Глобалы
 * не используются, поэтому размонтирование вызывается явно.
 */
afterEach(() => {
  cleanup();
});
