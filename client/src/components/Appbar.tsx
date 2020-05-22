import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import DarkIcon from '@material-ui/icons/Brightness4';
import LightIcon from '@material-ui/icons/Brightness5';

interface ButtonProps {
  darkModeEnabled: boolean;
}

const StyledAppBar = styled(AppBar)`
  && {
    background-color: transparent;
    box-shadow: none;
  }
`
const StyledButton = styled(Button)<ButtonProps>`
  &&{
    font-size: 1.8rem;
    font-weight: 900;
    color: ${( props ) => props.darkModeEnabled ? "white" : "black"}
  }
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
    <StyledAppBar position="static">
      <Toolbar>
        <div></div>
        <StyledButton
          darkModeEnabled={globalThemeMode === 'lightMode' ? false : true}
          onClick={toggleThemeMode}
        >
          {nextMode()}
        </StyledButton>
      </Toolbar>
    </StyledAppBar>
  )

}

export default Appbar;