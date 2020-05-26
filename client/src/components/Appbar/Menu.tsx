import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { StyledButton, StyledLink } from './styled';

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
    }
  ];

  return (
    <StylesProvider injectFirst>
      {menuObjects.map((menuObject: MenuItem) => (
        <StyledButton>
          <StyledLink href={menuObject.link}>
            {menuObject.name}
          </StyledLink>
        </StyledButton>
      ))}
    </StylesProvider>
  );
}

export default Menu;