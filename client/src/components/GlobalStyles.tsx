import { createGlobalStyle } from 'styled-components';

export interface globalThemeType {
  bg: string;
  elementBg: string;
  text: string;
  subtext: string;
  divider: string;
  progress: string;
  button: string;
  subButton: string;
  backdrop: string;
  appbarBg: string;
}

export const lightTheme = {
  bg: '#F2F2F4',
  elementBg: 'white',
  text: '#181F29',
  subtext: '#777788',
  divider: '#BBBBBB',
  progress: '0181FF',
  button: 'linear-gradient(45deg, #2176FF 30%, #21CBFF 80%)',
  subButton: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  backdrop: 'brightness(98%)',
  appbarBg: 'rgba(255, 255, 255, 0.6)'
}

export const darkTheme = {
  bg: '#18171C',
  elementBg: '#2C2C34',
  text: 'white',
  subtext: "#C0C4C8",
  divider: '#4B4A50',
  progress: '05CDFF',
  button: 'linear-gradient(45deg, #2176FF 30%, #21CBFF 80%)',
  subButton: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  backdrop: 'brightness(120%)',
  appbarBg: 'rgba(0, 0, 0, 0.6)'
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

  .MuiToolbar-regular {
    min-height: 5rem;
  }

  .MuiSnackbarContent-root {
    background: ${({ theme }) => theme.appbarBg};
    color: ${({ theme }) => theme.text};
    backdrop-filter: saturate(150%) blur(2rem);
    opacity: 1; 
    font-size: 1.5rem;
  }

  @media screen and (max-width: 600px) {
    html {
      font-size: 8.5px;
    }
  }

  a, div, input, p, span {
    -webkit-text-stroke: 0.3px;
  }
`