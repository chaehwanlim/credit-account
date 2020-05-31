import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Title, Company, BillGridContainer, StyledBox, BoxTitle, BoxTotal, StyledDivider, BoxContent, BillTitle, BillSubTitle, PeopleRemained, BillAttribute, Debtor, MenuName, Quantity, IsPaid, Total, BillDate, BillButton, TotalPerPerson } from '../styled';
import billFile from '../../../testdata/bills';
import companyFile from '../../../testdata/company';


const Bill: React.FC = () => {
  const [totalUnpaid, setTotalUnpaid] = useState<number>(0);
  
  useEffect(() => {
    document.title = "외상장부 - 계산서";

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

  const RenderBills = () => {
    return (
      billFile.map((bill) => {
        const stringfyDate = () => (
          `${bill.date.substring(0, 4)}년 ${bill.date.substring(4, 6)}월 ${bill.date.substring(6, 8)}일`
        )

        return (
          <Grid item md={4} sm={6} xs={12}>
            <StyledBox>
              <BillTitle>
                <Debtor>{bill.representative}님</Debtor>
              </BillTitle>

              <BillSubTitle>
                <PeopleRemained>포함 {bill.people}명</PeopleRemained>
                <BillDate>{stringfyDate()}</BillDate>
              </BillSubTitle>

              <StyledDivider />

              <BoxContent>
                <BillAttribute>
                  주문
                </BillAttribute>
              </BoxContent>

              {
                bill.order.map((item) => (
                  <BoxContent>
                    <MenuName>
                      {item.name}
                    </MenuName>
                    <Quantity>
                      {item.quantity}
                    </Quantity>
                  </BoxContent>
                ))
              }

              <BoxContent>
                <BillAttribute>
                  서비스
                </BillAttribute>
              </BoxContent>

              {
                bill.service.map((item) => (
                  <BoxContent>
                    <MenuName>
                      {item.name}
                    </MenuName>
                  </BoxContent>
                ))
              }

              <StyledDivider />

              <BoxContent>
                <IsPaid isPaid={bill.isPaid}>
                  {bill.isPaid ? "계산됨" : "계산되지 않음"}
                </IsPaid>
                <Total>
                  {bill.total.toLocaleString()}원
                </Total>
              </BoxContent>

              <BillSubTitle>
                <TotalPerPerson>
                  1인 {(bill.total / bill.people).toLocaleString()}원
                </TotalPerPerson>
              </BillSubTitle>
              
              <StyledDivider />

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  {bill.isPaid ? 
                  <BillButton>취소</BillButton> :
                  <BillButton>완료</BillButton>
                  }
                </Grid>
                <Grid item xs={4}>
                  <BillButton>수정</BillButton>
                </Grid>
                <Grid item xs={4}>
                  <BillButton>삭제</BillButton>
                </Grid>
              </Grid>
              
            </StyledBox>
          </Grid>
        )
      })
    )
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>

        <Title>계산서</Title>
        <Company>화끈불끈</Company>

        <Grid container spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <StyledBox>
              <BoxTitle>
                미수금
                <BoxTotal>
                  {totalUnpaid.toLocaleString()}원
                </BoxTotal>
              </BoxTitle>
            </StyledBox>
          </Grid>
        
          {RenderBills()}

        </Grid>

      </StylesProvider>
    </Container>
  )
}

export default Bill;