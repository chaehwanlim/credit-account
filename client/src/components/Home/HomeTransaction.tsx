import React, { useState, useEffect } from 'react';
import { StyledBox, BoxHeader, BoxSubheader, HeaderButton, StyledDivider, BoxContent, GreyContent } from '../styled';
import Axios from 'axios';

const HomeTransaction: React.FC<{ companyInfo: Company }> = ({ companyInfo }) => {
  const [totalUnpaid, setTotalUnpaid] = useState<number>(0);
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    Axios({
      method: 'get',
      url: `/api/bills/company/${companyInfo._id}`
    })
    .then(res => setBills(res.data))
    .catch(err => console.log(err));

  }, []);

  const calculateTotal = () => {
    let overallTotal = 0;

    bills.map((bill, index) => {
      if(bill.isPaid === 0) {
        overallTotal = overallTotal + bill.total;
      }
    });

    setTotalUnpaid(overallTotal);
  }


  const DisplayBills: React.FC = () => {
    let billsToDisplay = [];

    if (bills.length < 3) {
      billsToDisplay = bills;
    } 
    else {
      for(let i=0; i<3; i++) {
        billsToDisplay.push(bills[bills.length-i-1]);
      }
    }

    calculateTotal();
    
    return (
      <div>
      {billsToDisplay.map((bill: Bill, index) => (
        <BoxContent key={index}>
            {bill.representative}님
          <GreyContent>
            {bill.total.toLocaleString()}원
          </GreyContent>
        </BoxContent>
      ))}
      </div>
    )
  }

  const DisplayNothing: React.FC = () => {
    return (
      <BoxContent>
        외상장부를 추가해주세요.
      </BoxContent>
    )
  }

  return (
    <StyledBox>
      <HeaderButton onClick={() => location.assign('/bill')}>
        <BoxHeader>
          미수금
          <BoxSubheader>
            {totalUnpaid.toLocaleString()}원&nbsp;&#xE001;
          </BoxSubheader>
        </BoxHeader>
      </HeaderButton>
      
      <StyledDivider />

      {bills.length !== 0 ? <DisplayBills /> : <DisplayNothing />}
      {bills.length !== 0 ? 
      <GreyContent marginTop>
        포함 {bills.length}건의 외상거래
      </GreyContent>: null}
      
    </StyledBox>
  )

}

export default HomeTransaction;