import React, { useState, useEffect } from 'react';
import billFile from '../../../testdata/bills';
import { StyledBox, BoxTitle, BoxTotal, StyledDivider, BoxContent, Debtor, CreditAmount, Remain } from './styled';


const HomeTransaction: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [remain, setRemain] = useState(0);

  useEffect(() => {
    totalReceivable();
  }, []);

  const totalReceivable = () => {
    let tempTotal = 0;

    billFile.map((bill) => { 
      tempTotal = tempTotal + bill.total; 
    });

    setTotal(tempTotal);
  }

  const DisplayBills: React.FC = () => {
    let billsToDisplay = [];

    for(let i=0; i<3; i++) {
      billsToDisplay.push(billFile[i]);
    }

    setRemain(billFile.length - 3);

    return (
      <div>
      {billsToDisplay.map(bill => (
        <BoxContent>
          <Debtor>
            {bill.representative}님
          </Debtor>
          <CreditAmount>
            {bill.total}원
          </CreditAmount>
        </BoxContent>
      ))}
      </div>
    )
  }

  return (
    <StyledBox>
      <BoxTitle>
        미수금
        <BoxTotal>
          {total}원&nbsp;&#xE001;
        </BoxTotal>
      </BoxTitle>
      <StyledDivider />
      <DisplayBills />
      <Remain>
        외 {remain}건의 매출채권
      </Remain>
    </StyledBox>
  )

}

export default HomeTransaction;