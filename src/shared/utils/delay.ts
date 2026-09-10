/**
 * Имитация сетевой задержки для локальных фикстур.
 */
export const delay = (timeout: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, timeout);
  });
};
