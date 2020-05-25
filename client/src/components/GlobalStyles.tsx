import { createGlobalStyle } from 'styled-components';

export interface globalThemeType {
  bg: string;
  elementBg: string;
  text: string;
  subtext: string;
}

export const lightTheme = {
  bg: '#F0F0F3',
  elementBg: 'white',
  text: 'black',
  subtext: '#777788',
  divider: '#BBBBBB',
  progress: '0181FF',
  button: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
}

export const darkTheme = {
  bg: '#18171C',
  elementBg: '#2C2C34',
  text: 'white',
  subtext: "#C0C4C8",
  divider: '#4B4A50',
  progress: '05CDFF',
  button: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
}

export const GlobalStyles = createGlobalStyle<{ theme: globalThemeType }>`
  body {
    margin: 0;
    height: 100%;
    min-height: 100%;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  @media screen and (max-width: 600px) {
    html {
      font-size: 8.5px;
    }
  }

  a, div, input, p, span {
    -webkit-text-stroke: 0.2px;
  }
`