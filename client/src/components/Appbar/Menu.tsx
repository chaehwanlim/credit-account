import React from 'react';
import { StyledLink } from '../styled';
import { StyledButton } from './styled';

interface MenuItem {
  name: string;
  link: string;
}

const Menu: React.FC = () => {
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

  if (!sessionStorage.getItem('companyID')) {
    return (
      <span>
      {menuObjects.map((menuObject: MenuItem, index) => (
        <StyledButton key={index} onClick={() => alert('로그인이 필요합니다.')}>
          {menuObject.name}
        </StyledButton>
      ))}
      </span>
    );
  }

  return (
    <span>
    {menuObjects.map((menuObject: MenuItem, index) => (
      <StyledLink to={menuObject.link}  key={index}>
        <StyledButton>
          {menuObject.name}
        </StyledButton>
      </StyledLink>
    ))}
    </span>
  );
}

export default Menu;