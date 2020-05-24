import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import { StyledAppBar, StyledTitle, StyledButton } from './styled';
import Menu from './Menu';
import IconButton from '@material-ui/core/IconButton';
import DarkIcon from '@material-ui/icons/Brightness4';
import LightIcon from '@material-ui/icons/Brightness5';


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
    if (globalThemeMode === 'lightMode') {
      darkMode();
    } else {
      lightMode();
    }
  }
  
  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>
        <StyledAppBar position="static">
          <Toolbar style={{padding: 0}}>
            <StyledTitle darkModeEnabled={globalThemeMode === 'darkMode' ? true : false}>
            </StyledTitle>
            <Menu globalThemeMode={globalThemeMode} />
            <StyledButton
              darkModeEnabled={globalThemeMode === 'darkMode' ? true : false}
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