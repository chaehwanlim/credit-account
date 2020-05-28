import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Check from '@material-ui/icons/CheckCircleOutline';
import NotChecked from '@material-ui/icons/NotInterested';

export const Title = styled.div`
  margin-top: 8rem;
  font-size: 5rem;
  font-weight: 700;
`;

export const Company = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.subtext};
  margin-bottom: 4rem;
`;

export const BillGridContainer = styled(Grid)`
  margin-top: 3rem;
`;

export const StyledBox = styled(Box)`
  background-color: ${({ theme }) => theme.elementBg};
  border-radius: 1rem;
  padding: 1.5rem;
`;

export const BoxTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  flex-grow: 1;
`;

export const BoxSubTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  flex-grow: 1;
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
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

//HomeTransaction
export const Debtor = styled.span`
  color: ${({ theme }) => theme.text};
`;
export const CreditAmount = styled.span`
  color: ${({ theme }) => theme.subtext};
`;
export const Remain = styled(BoxContent)`
  flex-grow: 1;
  text-align: right;
`;

//HomeCompany
export const Attribute = styled(CreditAmount)`
  margin-left: 0;
`;
export const Info = Debtor;

//HomeMenu
export const MenuName = Debtor;
export const Price = CreditAmount;

//Bill
export const BillTitle = styled(BoxContent)`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;
export const BillSubTitle = styled(BoxContent)`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
`;
export const PeopleRemained = CreditAmount;
export const BillDate = CreditAmount;
export const BillAttribute = BoxSubTitle;
export const IsPaid = styled(BillTitle)<{ isPaid: number }>`
  color: ${( props ) => (props.isPaid === 1 ? "#1ABF80" : "#FF4444")};
`;
export const Total = BillTitle;
export const Quantity = Attribute;

export const CheckIcon = styled(Check)`
  font-size: 2rem;
  background-color: '#1ABF80';
  margin-left: 0.5rem;
`
export const NotCheckedIcon = styled(NotChecked)`
  font-size: 2rem;
  background-color: '#FF4444';
  margin-left: 0.5rem;
`

/* $musicBlue : #018DFF;
$movieRed : #FF4444;
$bookGreen : #1ABF80;

$T-content-bg: #202126;
$T-content-divider: #3B3A40;

$login : linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
$loginShadow: 0 3px 5px 2px rgba(33, 203, 243, .3);
$register : linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
$registerShadow: 0 3px 5px 2px rgba(255, 105, 135, .3); */