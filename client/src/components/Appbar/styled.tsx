import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { lightTheme, darkTheme } from '../GlobalStyles';

export interface darkModeProps {
  darkModeEnabled: boolean;
}

export const StyledAppBar = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
  display: flex;
  justify-content: space-between;
`
export const StyledButton = styled(Button)<darkModeProps>`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${( props ) => props.darkModeEnabled ? darkTheme.text : lightTheme.text};
`
export const StyledTitle = styled(Typography)<darkModeProps>`
  font-size: 1.8rem;
  font-weight: 900;
  color: ${( props ) => props.darkModeEnabled ? darkTheme.text : lightTheme.text};
  flex-grow: 1;
  position: flex;
`