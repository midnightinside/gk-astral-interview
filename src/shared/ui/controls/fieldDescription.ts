/**
 * Связь контрола с его подсказкой и текстом ошибки.
 *
 * Идентификаторы строятся из идентификатора контрола в одном месте, чтобы
 * разметка поля и значение `aria-describedby` не разъезжались.
 */

type DescribedByParams = {
  controlId: string;
  hasHint: boolean;
  hasError: boolean;
};

export const getHintId = (controlId: string) => `${controlId}-hint`;

export const getErrorId = (controlId: string) => `${controlId}-error`;

/**
 * Подсказка показывается только при отсутствии ошибки, поэтому и озвучивается
 * ровно то, что видно на экране.
 */
export const getDescribedBy = ({
  controlId,
  hasHint,
  hasError,
}: DescribedByParams) => {
  if (hasError) {
    return getErrorId(controlId);
  }

  return hasHint ? getHintId(controlId) : undefined;
};
