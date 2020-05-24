import React from 'react';
import { StyledButton } from './styled';

interface MenuItem {
  name: string;
  link: string;
}

interface MenuProps {
  globalThemeMode: string;
}

const Menu: React.SFC<MenuProps> = ({ globalThemeMode }) => {
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
    <div>
      {menuObjects.map((menuObject: MenuItem) => (
        <StyledButton
          darkModeEnabled={globalThemeMode === 'lightMode' ? false : true}
        >
          {menuObject.name}
        </StyledButton>
      ))}
    </div>
  );
}

export default Menu;