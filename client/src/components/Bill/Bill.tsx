import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Title, Company, StyledBox, BoxTitle, BoxTotal, StyledDivider, BoxContent, BillTitle, BillSubTitle, PeopleRemained, BillAttribute, Debtor, MenuName, Quantity, IsPaid, Total, BillDate, BillButton, TotalPerPerson } from '../styled';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';


const Bill: React.FC = () => {
  const [totalUnpaid, setTotalUnpaid] = useState<number>(0);
  const [bills, setBills] = useState<Bill[]>([]);
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  
  useEffect(() => {
    document.title = "외상장부 - 계산서";

    Axios({
      method: 'get',
      url: `/api/company/${sessionStorage.getItem('companyID')}`
    })
    .then(res => setCompanyInfo(res.data[0]))
    .catch(err => console.log(err));

    getBills();
  }, [totalUnpaid]);

  const getBills = () => {
    Axios({
      method: 'get',
      url: `/api/bills/company/${sessionStorage.getItem('companyID')}`
    })
    .then(res => setBills(res.data))
    .then(() => calculateTotal())
    .catch(err => console.log(err));
  }

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

  const RenderBills = () => {
    return (
      bills.map((bill, index) => {
        const stringfyDate = () => (
          `${bill.date.substring(0, 4)}년 ${bill.date.substring(4, 6)}월 ${bill.date.substring(6, 8)}일`
        )

        return (
          <Grid item md={4} sm={6} xs={12}>
            <StyledBox key={index}>
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
              {bill.memo ? 
                <div>
                <BoxContent>
                  <BillAttribute>
                    메모
                  </BillAttribute>
                </BoxContent>
                <BoxContent>
                  {bill.memo}
                </BoxContent>
                </div>
              : null}
              
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
                  <BillButton onClick={() => handlePaid(bill._id, bill.isPaid)}>
                    {bill.isPaid ? "취소" : "완료"}
                  </BillButton>
                </Grid>
                <Grid item xs={4}>
                  <BillButton onClick={handleEdit}>수정</BillButton>
                </Grid>
                <Grid item xs={4}>
                  <BillButton onClick={() => handleDelete(bill._id)}>삭제</BillButton>
                </Grid>
              </Grid>
              
            </StyledBox>
          </Grid>
        )
      })
    )
  }

  const RenderNoBills: React.FC = () => (
    <Grid item xs={12}>
      <StyledBox>
        <BoxTitle>
          외상 거래가 없습니다.
        </BoxTitle>
      </StyledBox>
    </Grid>
  )

  const handlePaid = (id: string, isPaid: number) => {
    Axios({
      method: 'put',
      url: `/api/bills/${id}`,
      data: {
        isPaid: 1-isPaid
      }
    })
    .then((res) => {
      if (res.data.success === 1)
        getBills();
      else if (res.data.fail === 1)
        alert('다시 시도해주세요.');
    })
    .catch(err => console.log(err));
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    
  }

  const handleDelete = (id: string) => {
    Axios({
      method: 'delete',
      url: `/api/bills/${id}`,
      data: {
        isDeleted: 1
      }
    })
    .then((res) => {
      if (res.data.success === 1)
        getBills();
      else if (res.data.fail === 1)
        alert('다시 시도해주세요.');
    })
    .catch(err => console.log(err));
  }

  if (!companyInfo || bills.length === 0 ) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>

        <Title>계산서</Title>
        <Company>{companyInfo.name}</Company>

        <Grid container spacing={3}
          direction="row"
          justify="flex-start"
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
        
          {bills.length !== 0 ? RenderBills() : <RenderNoBills />}

        </Grid>

      </StylesProvider>
    </Container>
  )
}

export default Bill;