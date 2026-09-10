/**
 * Случайный элемент непустого массива.
 */
export const pickRandom = <TItem>(items: readonly TItem[], fallback: TItem) => {
  if (items.length === 0) {
    return fallback;
  }

  return items[Math.floor(Math.random() * items.length)] ?? fallback;
};
