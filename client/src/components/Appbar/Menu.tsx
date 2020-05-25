import React from 'react';
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
    }
  ];

  return (
    <div>
      {menuObjects.map((menuObject: MenuItem) => (
        <StyledButton>
          {menuObject.name}
        </StyledButton>
      ))}
    </div>
  );
}

export default Menu;