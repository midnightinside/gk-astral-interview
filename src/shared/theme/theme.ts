/**
 * Дизайн-токены приложения.
 *
 * Токены импортируются напрямую в styles-файлы компонентов: это избавляет от
 * augmentation-а типов emotion и оставляет тему обычным типизированным
 * объектом.
 */
export const theme = {
  color: {
    background: '#f2f5fb',
    surface: '#ffffff',
    surfaceMuted: '#eef2fa',
    border: '#d9e0ef',
    borderStrong: '#b9c4dd',
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryMuted: '#dbe7ff',
    contrast: '#ffffff',
    text: '#111827',
    textSecondary: '#5b6478',
    textDisabled: '#9aa3b5',
    danger: '#d64545',
    dangerMuted: '#fdecec',
    success: '#12855f',
    successMuted: '#e3f6ee',
    accent: '#7c5cf0',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    pill: '999px',
  },
  shadow: {
    sm: '0 1px 2px rgba(17, 24, 39, 0.06)',
    md: '0 8px 24px rgba(17, 24, 39, 0.09)',
    lg: '0 20px 48px rgba(17, 24, 39, 0.18)',
  },
  font: {
    family: "'Segoe UI', 'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Consolas', monospace",
  },
  breakpoint: {
    sm: '640px',
    md: '900px',
    lg: '1200px',
  },
  transition: {
    fast: '150ms ease',
    base: '250ms ease',
    slow: '600ms cubic-bezier(0.4, 0.2, 0.2, 1)',
  },
  layout: {
    contentWidth: '1120px',
    headerHeight: '64px',
  },
} as const;

/**
 * Отступ, кратный базовой сетке 4px.
 */
export const spacing = (multiplier: number) => `${multiplier * 4}px`;
