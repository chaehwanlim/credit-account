import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

export const Title = styled.div`
  margin-top: 12rem;
  font-size: 5rem;
  font-weight: 700;
`;

export const Company = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.subtext};
  margin-bottom: 4rem;
`;

export const StyledBox = styled(Box)`
  background-color: ${({ theme }) => theme.elementBg};
  border-radius: 1rem;
  padding: 1.5rem;
`;

export const BoxTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
  flex: 1;
`;

export const BoxTotal = styled.span`
  font-size: 2.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.subtext};
  margin-left: 1rem;
`;

export const StyledDivider = styled(Divider)`
  background-color: ${({ theme }) => theme.divider};
  margin: 1.5rem 0rem 1.5rem 0rem;
`;

export const BoxContent = styled.div`
  margin: 1rem 0rem 0rem 0rem;
  font-size: 1.8rem;
  font-weight: 400;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Representative = styled.span`
  color: ${({ theme }) => theme.text};
`;

export const People = styled.span`
  color: ${({ theme }) => theme.subtext};
  margin-left: 1rem;
  text-align: right;
`;