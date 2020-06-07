import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/MenuRounded';
import { StyledAppBar, StyledAppBarMini, StyledTitle, StyledButton } from './styled';
import Menu from './Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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

  const accountMode = () => {
    if(sessionStorage.getItem('companyID'))
      return '로그아웃';
    else {
      return '로그인';
    }
  }

  const handleAccount = () => {
    if(sessionStorage.getItem('companyID')) {
      sessionStorage.removeItem('companyID');
      sessionStorage.removeItem('name');
      alert('로그아웃 되었습니다.');
    }
    location.assign('/login');
  }
  
  return (
    <StylesProvider injectFirst>

        {/* 600px 이상일 때 */}
        <StyledAppBar position="sticky" 
          onScroll={handleScroll} 
          elevation={0}
        >
          <Container maxWidth="md">
            <Toolbar style={{padding: 0}}>
              <StyledTitle>
                {appbarTitle}
              </StyledTitle>
              <Menu />
              <StyledButton onClick={toggleThemeMode}>
                {nextMode()}
              </StyledButton>
              <StyledButton onClick={handleAccount}>
                {accountMode()}
              </StyledButton>
            </Toolbar>
          </Container>
        </StyledAppBar>


        {/* 599px 이하일 때 */}
        <StyledAppBarMini position="sticky" elevation={0}>
          <Toolbar style={{padding: '0 0 0 16px'}}>
            <StyledTitle>
              {appbarTitle}
            </StyledTitle>
            
            <React.Fragment>
              <IconButton onClick={() => setMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor={"top"}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                onOpen={() => setMenuOpen(true)}
              >
                <Menu />
                <StyledButton onClick={toggleThemeMode}>
                  {nextMode()}
                </StyledButton>
                <StyledButton onClick={handleAccount}>
                  {accountMode()}
                </StyledButton>
              </SwipeableDrawer>
            </React.Fragment>
          </Toolbar>
        </StyledAppBarMini>

    </StylesProvider>
  )
}

export default Appbar;