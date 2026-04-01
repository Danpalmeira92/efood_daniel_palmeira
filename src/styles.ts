import { createGlobalStyle } from 'styled-components'

export const colors = {
  salmon: '#E66767',
  black: '#111111',
  grey: '#faf5f1ff',
  green: '#10AC84',
  lightGrey: '#A3A3A3',
  lightBeige: '#FFEBD9'
}

export const breakpoints = {
  desktop: '1024px',
  tablet: '769px'
}

export const GlobalCss = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
      list-style: none;
      text-decoration: none;
    }

    body {
      background-color: ${colors.lightBeige};
      color: ${colors.salmon};

    }

    .container {
      max-width: 1024px;
      width: 100%;
      margin: 0 auto;

      @media (max-width: ${breakpoints.desktop}) {
        max-width: 80%;
      }
    }
  `
