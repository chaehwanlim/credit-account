import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 599px) {
    & {
      display: none;
    }
  }
`;

export const StyledButton = styled(Button)`
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  min-width: 0;
  margin-left: 1rem;
`;

export const StyledTitle = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 900; 
  color: ${({ theme }) => theme.text};
  flex-grow: 1;
  position: flex;
`;

export const StyledAppBarMini = styled(AppBar)`
  background-color: ${({ theme }) => theme.bg};

  @media screen and (min-width: 600px) {
    & {
      display: none;
    }
  }
`