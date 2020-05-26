import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Title, Company, StyledBox, BoxTitle, BoxTotal, StyledDivider, BoxContent, Representative, People } from './styled';
import billFile from '../../../testdata/bills';


const Bill: React.FC = () => {

  const RenderBills: React.FC = () => (
    <Grid container spacing={1}
      direction="row"
      justify="center"
      alignItems="stretch"
    >
    {
      billFile.map((bill) => (
        <Grid item md={4} sm={6} xs={12}>
          <StyledBox>
            <BoxContent>
              <Representative>{bill.representative}님</Representative>
              <People>포함 {bill.people}명</People>

              <StyledDivider />

              {
                bill.order.map((item) => (
                  <div>
                    {item.이름}&nbsp;{item.수량}
                  </div>
                ))
              }
            </BoxContent>
          </StyledBox>
        </Grid>
      ))
    }
    </Grid>
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