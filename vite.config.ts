/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    /**
     * Абсолютный путь вместо относительного: на Windows Vitest резолвит
     * относительный setup-файл от текущей директории, и при отличии регистра
     * буквы диска он попадает в отдельный граф модулей со своей копией
     * `vitest` — хуки перестают видеть текущий сьют.
     */
    setupFiles: [fileURLToPath(new URL('./vitest.setup.ts', import.meta.url))],
    include: ['src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
});
