import styled, { css } from 'styled-components';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';

//Boxes
const centerItems = css`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledBox = styled(Box)`
  background-color: ${({ theme }) => theme.elementBg};
  border-radius: 1rem;
  padding: 1.5rem;
`;

export const ArrayBox = styled(StyledBox)`
  background-color: ${({ theme }) => theme.bg};
  margin-top: 1rem;
`;

export const CenteredBox = styled(StyledBox)`
  display: flex;
  ${centerItems};
`;

export const ModalBox = styled(StyledBox)`
  position: 50%;
  max-width: 40rem;
  outline: 0;
`;



//Typography
export const PageTitle = styled.div`
  margin-top: 4rem;
  font-size: 5rem;
  font-weight: 700;
`;

export const PageSubtitle = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.subtext};
  margin-bottom: 4rem;
`;

export const BoxHeader = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  flex-grow: 1;
`;

export const BoxSubheader = styled.span`
  font-size: 2.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.subtext};
  margin-left: 1rem;
`;

export const BoxTitle = styled.div<{ stickTop?: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  margin: 1rem 0rem 0rem 0rem;
  margin-top: ${( props ) => ( props.stickTop ? '0rem' : null )};
`;
export const BoxSubtitle = styled.div<{ alignRight?: boolean }>`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  color: ${({ theme }) => theme.subtext};
  text-align: ${( props ) => props.alignRight ? 'right' : null };
`
export const CenteredBoxTitle = styled(BoxHeader)`
  text-align: center;
  margin-bottom: 2rem;
`;

export const IsPaid = styled(BoxTitle)<{ isPaid: number }>`
  color: ${( props ) => (props.isPaid === 1 ? "#1ABF80" : "#FF4444")};
`;

export const GreyTitle = styled.div<{ marginTop?: boolean }>`
  font-size: 2rem;
  color: ${({ theme }) => theme.subtext};
  margin-top: ${( props ) => props.marginTop ? '1rem' : null };
`;

export const GreyContent = styled.div<{ marginTop?: boolean, edit?: boolean }>`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.subtext};
  margin-top: ${( props ) => props.marginTop ? '1rem' : null };
  min-width: ${( props ) => props.edit ? '6rem' : null };
  text-align: ${( props ) => props.edit ? 'center' : null };
`;

export const EditHeader = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: right;
  justify-content: flex-end;
  margin-top: 4rem;
`;

export const EditSubheader = styled(EditHeader)`
  color: ${({ theme }) => theme.subtext};
  font-size: 2rem;
  margin-top: 0rem;
  margin-bottom: 4rem;
`;



//Divider
export const StyledDivider = styled(Divider)`
  background-color: ${({ theme }) => theme.divider};
  margin: 1.5rem 0rem 1.5rem 0rem;
`;



//item이 두개 있을때 사용
export const BoxContent = styled.div<{ stickTop?: boolean, marginLeft?: boolean, noSpace?: boolean }>`
  margin: 1rem 0rem 0rem 0rem;
  margin-top: ${( props ) => props.stickTop ? '0rem' : null };
  margin-left: ${( props ) => props.marginLeft ? '1rem' : null };
  margin: ${( props ) => props.noSpace ? '0rem' : null };
  font-size: 1.8rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;



//Buttons
export const StyledButton = styled(Button)<{ big?: boolean, colored?: boolean, sub?: boolean }>`
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
  background: ${( props ) => ( props.colored  ? ({ theme }) => theme.button : ({ theme }) => theme.bg )};
  background: ${( props ) => ( props.sub ? ({ theme }) => theme.subButton : null )};
  color: ${( props ) => ( props.colored ? 'white' : ({ theme }) => theme.subtext )};
  border-radius: 1rem;
  padding: ${( props ) => props.big ? '2rem 0rem' : null };
`;

export const HeaderButton = styled(StyledButton)`
  background: ${({ theme }) => theme.elementBg};
  color: ${({ theme }) => theme.text};
  margin: 0;
  padding: 0;
  text-align: left;
`;

export const LoginButton = styled(StyledButton)`
  margin: 1rem 0rem 4rem 0rem;
`;

export const StyledIconButton = styled(IconButton)<{ wide?: boolean }>`
  padding: 0.5rem;
  padding: ${( props ) => props.wide ? '1.5rem' : null };
  margin-left: ${( props ) => props.wide ? '1rem' : null };
`;

export const SearchResult = styled(Button)`
  display: block;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  font-weight: 400;
`;


//Input
export const StyledInput = styled(InputBase)<{ noSpace?: boolean }>`
  background: ${({ theme }) => theme.bg};
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-weight: 500;
  margin: ${( props ) => props.noSpace ? '0rem' : null };
  padding: ${( props ) => props.noSpace ? '0rem' : null };
`;

export const SearchBar = styled(StyledInput)`
  background: ${({ theme }) => theme.elementBg};
  margin: 0;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 30rem;
`;


//etc
export const StyledSnackbar = styled(Snackbar)`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledFab = styled(Fab)`
  background: ${({ theme }) => theme.button};
  color: white;
  position: fixed;
  bottom: 2rem;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);

`;


/* $musicBlue : #018DFF;
$movieRed : #FF4444;
$bookGreen : #1ABF80;

$T-content-bg: #202126;
$T-content-divider: #3B3A40;

$login : linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
$loginShadow: 0 3px 5px 2px rgba(33, 203, 243, .3);
$register : linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
$registerShadow: 0 3px 5px 2px rgba(255, 105, 135, .3); */