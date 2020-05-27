import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Title, Company, BillGridContainer, StyledBox, BoxTitle, BoxTotal, StyledDivider, BoxContent, BillTitle, BillSubTitle, PeopleRemained, BillAttribute, Debtor, MenuName, Quantity, IsPaid, Total, BillDate, CheckIcon, NotCheckedIcon } from '../styled';
import billFile from '../../../testdata/bills';
import companyFile from '../../../testdata/company';


const Bill: React.FC = () => {

  const RenderBills: React.FC = () => (
    <BillGridContainer container spacing={3}
      direction="row"
      justify="center"
      alignItems="stretch"
    >
    {
      billFile.map((bill) => {
        let total = 0;
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
                bill.order.map((item) => {
                  total = total + companyFile.price[item.name] * item.quantity;
                  console.log(total);

                  return (
                    <BoxContent>
                      <MenuName>
                        {item.name}
                      </MenuName>
                      <Quantity>
                        {item.quantity}
                      </Quantity>
                    </BoxContent>
                  )
                })
              }

              <StyledDivider />

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
                  {total}원
                </Total>
              </BoxContent>
            </StyledBox>
          </Grid>
        )
      })
    }
    </BillGridContainer>
  )

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>

        <Title>계산서</Title>
        <Company>화끈불끈</Company>

        <StyledBox>
          <BoxTitle>
            미수금
            <BoxTotal>
              total원
            </BoxTotal>
          </BoxTitle>
        </StyledBox>

        <RenderBills />

      </StylesProvider>
    </Container>
  )
}

export default Bill;