import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  ${() => css`
    * {
      margin: 0;
      outline: 0;
      padding: 0;
      font-family: 'Roboto', sans-serif;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html,
    body {
      height: 100%;
    }

    body {
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    button {
      cursor: pointer;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    ul,
    li,
    ol {
      list-style: none;
    }
  `};
`
