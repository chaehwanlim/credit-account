import React, { useState, useEffect } from 'react';
import billFile from '../../../testdata/bills';
import { StyledBox, BoxTitle, BoxTotal, StyledDivider, BoxContent, Debtor, CreditAmount } from './styled';


const HomeTransaction: React.FC = () => {
  const [total, setTotal] = useState(0);

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
    return (
      <div>
      {billFile.map(bill => (
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
        <span></span>
      </BoxTitle>
      <StyledDivider />
      <DisplayBills />
    </StyledBox>
  )

}

export default HomeTransaction;