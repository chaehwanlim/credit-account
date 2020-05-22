import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

interface globalThemeType {
  bg: string;
  elementBg: string;
  text: string;
}

export const lightTheme = {
  bg: 'whitesmoke',
  elementBg: 'white',
  text: 'black',
}

export const darkTheme = {
  bg: '#18171C',
  elementBg: '#202126',
  text: 'white',
}

export const GlobalStyles = createGlobalStyle<{ theme: globalThemeType }>`
  body {
    margin: 0;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  @media screen and (max-width: 600px) {
    html {
      font-size: 8.5px;
    }
  }
`