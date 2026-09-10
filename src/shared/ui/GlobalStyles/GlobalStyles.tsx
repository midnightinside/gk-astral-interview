import { css, Global } from '@emotion/react';

import { theme } from '~/shared/theme';

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: ${theme.font.family};
    font-size: 15px;
    line-height: 1.6;
    color: ${theme.color.text};
    background: ${theme.color.background};
    -webkit-font-smoothing: antialiased;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`;

export const GlobalStyles = () => {
  return <Global styles={globalStyles} />;
};
