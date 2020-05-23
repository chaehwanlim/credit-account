import React from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DarkIcon from '@material-ui/icons/Brightness4';
import LightIcon from '@material-ui/icons/Brightness5';

interface ButtonProps {
  darkModeEnabled: boolean;
}

const StyledAppBar = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
  display: flex;
  justify-content: space-between;

`
const StyledButton = styled(Button)<ButtonProps>`
  font-size: 1.8rem;
  font-weight: 900;
  color: ${( props ) => props.darkModeEnabled ? "white" : "black"};
  float: right;

`

interface AppbarPropsType {
  globalThemeMode: string;
  lightMode: () => void;
  darkMode: () => void;
}

const Appbar: React.SFC<AppbarPropsType> = ({ globalThemeMode, lightMode, darkMode }) => {

  const nextMode = () => {
    if (globalThemeMode === 'lightMode')
      return '다크 모드';
    else {
      return '라이트 모드';
    }
  }

  const toggleThemeMode = () => {
    if (globalThemeMode === 'lightMode')
      darkMode();
    else {
      lightMode();
    }
  }
  
  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>
        <StyledAppBar position="static">
        <Toolbar style={{padding: 0}}>
          <StyledButton
            darkModeEnabled={globalThemeMode === 'lightMode' ? false : true}
            onClick={toggleThemeMode}
          >
            {nextMode()}
          </StyledButton>
        </Toolbar>
      </StyledAppBar>
      </StylesProvider>
      
    </Container>
  )
}

export default Appbar;