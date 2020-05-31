import React, { useState, useEffect } from 'react';
import billFile from '../../../testdata/bills';
import companyFile from '../../../testdata/company';
import { StyledBox, BoxTitle, BoxTotal, StyledDivider, BoxContent, Debtor, CreditAmount, Remain, HomeButton } from '../styled';


const HomeTransaction: React.FC = () => {
  const [remain, setRemain] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState<number>(0);

  useEffect(() => {
    calculateTotal();
  }, []);

  const calculateTotal = () => {
    let overallTotal = 0;

    billFile.map((bill, index) => {
      if(bill.isPaid === 0) {
        let total = 0;

        bill.order.map((item) => total = total + companyFile.price[item.name] * item.quantity);

        overallTotal = overallTotal + total;
      }
    });

    setTotalUnpaid(overallTotal);
  }


  const DisplayBills: React.FC = () => {
    let billsToDisplay = [];

    for(let i=0; i<3; i++) {
      billsToDisplay.push(billFile[i]);
    }

    setRemain(billFile.length - 3);

    return (
      <div>
      {billsToDisplay.map((bill, index) => (
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
      <DisplayBills />
      <Remain>
        외 {remain}건의 매출채권
      </Remain>
    </StyledBox>
  )

}

export default HomeTransaction;