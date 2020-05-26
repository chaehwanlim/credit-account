import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import { StyledAppBar, StyledTitle, StyledButton } from './styled';
import Menu from './Menu';


interface AppbarPropsType {
  globalThemeMode: string;
  lightMode: () => void;
  darkMode: () => void;
}

interface ElevationProps {
  window?: () => Window;
  children: React.ReactElement;
}

const ElevationScroll = (props: ElevationProps) => {
  const { window, children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window(): undefined,
  });

  return React.cloneElement(children, {
    backgroundColor: trigger ? 'red' : 'blue',
  });

}

const Appbar: React.SFC<AppbarPropsType> = (props: AppbarPropsType) => {
  const [scrollPos, setScrollPos] = useState(0);
  const [appbarTitle, setAppbarTitle] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  const handleScroll = (e) => {
    let scrollTop = document.body.scrollTop;

    if (scrollTop > 10) {
      setAppbarTitle('홈');
      console.log('scrolling');
    }

  }

  const nextMode = () => {
    if (props.globalThemeMode === 'lightMode')
      return '다크 모드';
    else {
      return '라이트 모드';
    }
  }

  const toggleThemeMode = () => {
    if (props.globalThemeMode === 'lightMode') {
      props.darkMode();
    } else {
      props.lightMode();
    }
  }
  
  return (
    <StylesProvider injectFirst>
      <ElevationScroll {...props}>
        <StyledAppBar position="fixed" onScroll={handleScroll}>
          <Container maxWidth="md">
            <Toolbar style={{padding: 0}}>
              <StyledTitle>
                {appbarTitle}
              </StyledTitle>
              <Menu />
              <StyledButton onClick={toggleThemeMode}>
                {nextMode()}
              </StyledButton>
            </Toolbar>
          </Container>
        </StyledAppBar>
      </ElevationScroll>
    </StylesProvider>
  )
}

export default Appbar;