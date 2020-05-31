import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
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
      link: "/add"
    },
    {
      name: "내 기업",
      link: "/company"
    }
  ];

  return (
    <StylesProvider injectFirst>
      {menuObjects.map((menuObject: MenuItem, index) => (
        <StyledButton key={index} onClick={() => location.assign(menuObject.link)}>{menuObject.name}
        </StyledButton>
      ))}
    </StylesProvider>
  );
}

export default Menu;