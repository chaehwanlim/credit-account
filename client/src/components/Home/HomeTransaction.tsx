import React, { useState, useEffect } from 'react';
import { StyledBox, BoxTitle, BoxTotal, StyledDivider, BoxContent, Debtor, CreditAmount, Remain, HomeButton } from '../styled';
import Axios from 'axios';

const HomeTransaction: React.SFC<{ companyInfo: Company }> = ({ companyInfo }) => {
  const [remain, setRemain] = useState(0);
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
        let total = 0;

        bill.order.map((item) => total = total + companyInfo.price[item.name] * item.quantity);

        overallTotal = overallTotal + total;
      }
    });

    setTotalUnpaid(overallTotal);
  }


  const DisplayBills: React.FC = () => {
    let billsToDisplay = [];

    for(let i=0; i<3; i++) {
      billsToDisplay.push(bills[bills.length-i-1]);
    }

    console.log(billsToDisplay);

    setRemain(bills.length - 3);

    calculateTotal();
    
    return (
      <div>
      {billsToDisplay.map((bill: Bill, index) => (
        <BoxContent key={index}>
          <Debtor>
            {bill.representative}님
          </Debtor>
          <CreditAmount>
            {bill.total.toLocaleString()}원
          </CreditAmount>
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
      <HomeButton onClick={() => location.assign('/bill')}>
        <BoxTitle>
          미수금
          <BoxTotal>
            {totalUnpaid.toLocaleString()}원&nbsp;&#xE001;
          </BoxTotal>
        </BoxTitle>
      </HomeButton>
      
      <StyledDivider />

      {bills.length !== 0 ? <DisplayBills /> : <DisplayNothing />}
      {bills.length !== 0 ? 
      <Remain>
        외 {remain}건의 매출채권
      </Remain> : null}
    </StyledBox>
  )

}

export default HomeTransaction;