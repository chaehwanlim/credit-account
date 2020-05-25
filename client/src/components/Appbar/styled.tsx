import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.bg};

  display: flex;
  justify-content: space-between;
`;

export const StyledButton = styled(Button)`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

export const StyledTitle = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 900; 
  color: ${({ theme }) => theme.text};
  flex-grow: 1;
  position: flex;
`;