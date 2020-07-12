import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/MenuRounded';
import { StyledAppBar, StyledAppBarMini, StyledTitle, StyledButton, StyledToolbar } from './styled';
import Menu from './Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


interface AppbarPropsType {
  globalThemeMode: string;
  title: string;
  lightMode: () => void;
  darkMode: () => void;
}

const setTitleOnScroll = () => {
  const [pos, setPos] = useState<{x: number, y: number}>({ x: 0, y: 0 });

  const onScroll = () => {
    setPos({ x: window.scrollX, y: window.scrollY });
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    //componentWillUnmount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return pos;

}

const Appbar: React.FC<AppbarPropsType> = (props: AppbarPropsType) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { y } = setTitleOnScroll();

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
    <span>
      {/* 600px 이상일 때 */}
      <StyledAppBar position="sticky" 
        elevation={0}
        blur={y > 50 ? true : false}
      >
        <Container maxWidth="md">
          <StyledToolbar style={{padding: 0}}>
            {y > 50 ? <StyledTitle>{props.title}</StyledTitle> : <div></div>}
            
            <div>
              <Menu title={props.title}/>
              <StyledButton onClick={toggleThemeMode}>
                {nextMode()}
              </StyledButton>
              <StyledButton onClick={handleAccount}>
                {accountMode()}
              </StyledButton>
            </div>

          </StyledToolbar>
        </Container>
      </StyledAppBar>


      {/* 599px 이하일 때 */}
      <StyledAppBarMini position="sticky" 
        elevation={0} 
        blur={y > 50 ? true : false}
      >
        <StyledToolbar style={{padding: 0}}>
          {y > 50 ? <StyledTitle>{props.title}</StyledTitle> : <div></div>}
          
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
              <Menu title={props.title} />
              <StyledButton onClick={toggleThemeMode}>
                {nextMode()}
              </StyledButton>
              <StyledButton onClick={handleAccount}>
                {accountMode()}
              </StyledButton>
            </SwipeableDrawer>
          </React.Fragment>
        </StyledToolbar>
      </StyledAppBarMini>

    </span>
  )
}

export default Appbar;