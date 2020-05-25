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
  padding: 1.5rem 1.5rem 1rem 1.5rem;
`;

export const BoxTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
  flex: 1;
`;

export const BoxSubTitle = styled.div`
  font-size: 2rem;
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
  margin: 1.5rem 0rem 1rem 0rem;
`;

export const BoxContent = styled.div`
  margin: 0.5rem 0rem;
  font-size: 1.8rem;
  font-weight: 400;
`;

export const Debtor = styled.span`
  color: ${({ theme }) => theme.text};
`;

export const CreditAmount = styled.span`
  color: ${({ theme }) => theme.subtext};
  margin-left: 1rem;
`;

export const Attribute = styled(CreditAmount)`
  margin-left: 0;
`;

export const Info = styled(Debtor)`
  margin-left: 1rem;
`;

export const Name = Debtor;
export const Price = CreditAmount;