import { createGlobalStyle } from 'styled-components'

export const cores = {
  salmon: '#E66767',
  preto: '#111111',
  cinza: '#faf5f1ff',
  verde: '#10AC84',
  cinzaClaro: '#A3A3A3',
  begeClaro: '#FFEBD9'
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
      background-color: ${cores.begeClaro};
      color: ${cores.salmon};

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
