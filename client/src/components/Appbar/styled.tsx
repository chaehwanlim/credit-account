import styled, { css } from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const blurBg = css`
  background: ${({ theme }) => theme.appbarBg};
  backdrop-filter: saturate(150%) blur(2rem);
  opacity: 1; 
  border-bottom: 0.05rem solid rgba(0, 0, 0, 0.2);
`;

export const StyledAppBar = styled(AppBar)<{ blur?: boolean }>`
  background: transparent;
  display: flex;
  justify-content: space-between;

  ${( props ) => props.blur && blurBg};

  @media screen and (max-width: 599px) {
    & {
      display: none;
    }
  }
`;

export const StyledToolbar = styled(Toolbar)`
  padding: 0;
  justify-content: space-between;
`;

export const StyledButton = styled(Button)`
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  min-width: 0;
  margin-left: 1rem;

  @media screen and (max-width: 599px) {
    & {
      margin: 0;
      font-size: 2rem;
    }
  }
`;

export const StyledTitle = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 700; 
  color: ${({ theme }) => theme.text};
  flex-grow: 1;
`;

export const StyledAppBarMini = styled(AppBar)<{ blur?: boolean }>`
  background: transparent;
  font-size: 1.8rem;

  ${( props ) => props.blur && blurBg};

  @media screen and (min-width: 600px) {
    & {
      display: none;
    }
  }
`