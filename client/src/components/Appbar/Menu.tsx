import React from 'react';
import { StyledLink } from '../styled';
import { StyledButton, MenuContainer } from './styled';

interface MenuItem {
  name: string;
  link: string;
}

interface MenuProps {
  title: string;
  toggleThemeMode: () => void;
  nextMode: () => string;
  handleAccount: () => void;
  accountMode: () => string;
}

const Menu: React.FC<MenuProps> = ({ title, toggleThemeMode, nextMode, handleAccount, accountMode }) => {
  const menuObjects: MenuItem[] = [
    { 
      name: "홈",
      link: "/"
    },
    {
      name: "계산서",
      link: "/bill"
    },
    {
      name: "추가",
      link: "/bill/new"
    },
    {
      name: "내 기업",
      link: "/company"
    }
  ];

  //로그인정보가 없을 때
  if (!sessionStorage.getItem('companyID')) {
    return (
      <MenuContainer>
        {menuObjects.map((menuObject: MenuItem, index) => (
          <StyledButton key={index} 
            onClick={() => alert('로그인이 필요합니다.')}>
            {menuObject.name}
          </StyledButton>
        ))}
        <StyledButton onClick={toggleThemeMode}>
          {nextMode()}
        </StyledButton>
        <StyledButton onClick={handleAccount}>
          {accountMode()}
        </StyledButton>
      </MenuContainer>
    );
  }

  //로그인정보가 있을 때
  return (
    <MenuContainer>
      {menuObjects.map((menuObject: MenuItem, index) => (
        <StyledLink to={menuObject.link} key={index}>
          <StyledButton check={title === menuObject.name}>
            {menuObject.name}
          </StyledButton>
        </StyledLink>
      ))}
      <StyledButton onClick={toggleThemeMode}>
        {nextMode()}
      </StyledButton>
      <StyledButton onClick={handleAccount}>
        {accountMode()}
      </StyledButton>
    </MenuContainer>
  );
}

export default Menu;