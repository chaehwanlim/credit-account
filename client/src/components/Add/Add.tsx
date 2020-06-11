import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Title, Company, StyledBox, AddTotal, StyledAddButtonBig, AddTotalPerPerson } from '../styled';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';
import EditDate from './EditDate';
import EditOrder from './EditOrder';
import EditService from './EditService';
import EditPeople from './EditPeople';
import EditMemo from './EditMemo';

const dateToString = (date: Date | null) => {
  let dateStr = ""

  dateStr = dateStr.concat(date.getFullYear().toString());
  
  if (date.getMonth() + 1 < 10) {
    dateStr = dateStr.concat("0" + (date.getMonth() + 1).toString());
  } else {
    dateStr = dateStr.concat((date.getMonth() + 1).toString());
  }

  if (date.getDate() < 10) {
    dateStr = dateStr.concat("0" + date.getDate().toString());
  } else {
    dateStr = dateStr.concat(date.getDate().toString());
  }

  return dateStr;
}

const Add: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [billForm, setBillForm] = useState<Form>({
    date: dateToString(selectedDate),
    people: 1,
    representative: "",
    order: [],
    service: [],
    memo: "",
    total: 0
  });
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);

  useEffect(() => {
    document.title = "외상장부 - 추가";

    Axios({
      method: 'get',
      url: `/api/company/${sessionStorage.getItem('companyID')}`
    })
    .then(res => setCompanyInfo(res.data[0]))
    .then(() => calculateTotal())
    .catch(err => console.log(err));

  }, [selectedDate, billForm.people, billForm.representative]);

  const handleDate = (date: Date | null) => {
    setSelectedDate(date);
  }

  const calculateTotal = () => {
    let total = 0;

    billForm.order.map((item) => (total = total + item.quantity * companyInfo.price[item.name]));

    setBillForm({
      ...billForm,
      total: total
    });
  }

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (billForm.representative === '') {
      alert('대표자를 입력해주세요.');
      return;
    }
    if (billForm.order.length === 0) {
      alert('메뉴를 1개 이상 선택해주세요.');
      return;
    }

    Axios({
      method: 'post',
      url: '/api/bills',
      data: {
        ...billForm,
        date: dateToString(selectedDate),
        companyID: sessionStorage.getItem('companyID'),
        isPaid: 0,
        isDeleted: 0
      }
    })
    .then(res => {
      if (res.data.success === 1) {
        alert('계산서를 추가했습니다!');
        location.assign('/bill');
      } else if (res.data.fail === 1) {
        alert('계산서 추가에 오류가 발생했습니다. 다시 시도해주세요.');
      }
    })
    .catch(err => console.log(err));
  }

  if(!companyInfo) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>

        <Title>추가</Title>
        <Company>{companyInfo.name}</Company>
        
        <StyledBox>

          <Grid container
            direction="row"
            justify="space-between"
            alignItems="stretch"
            spacing={5}
          >

            <EditDate 
              selectedDate={selectedDate}
              handleDate={handleDate}
            />
            
            <EditPeople
              billForm={billForm}
              setBillForm={setBillForm}
            />
          
            <EditOrder 
              menuDisplay={companyInfo.menuDisplay}
              billForm={billForm}
              calculateTotal={calculateTotal}
              setBillForm={setBillForm}
            />

            <EditService
              menuDisplay={companyInfo.menuDisplay}
              billForm={billForm}
              calculateTotal={calculateTotal}
              setBillForm={setBillForm}
            />

            <EditMemo
              billForm={billForm}
              setBillForm={setBillForm}
            />
            
          </Grid>

          <AddTotal>
            합계 {billForm.total.toLocaleString()}원
          </AddTotal>
          <AddTotalPerPerson>
            1인 {(billForm.total / billForm.people).toLocaleString()}원
          </AddTotalPerPerson>

          <StyledAddButtonBig onClick={submitForm}>
            추가하기
          </StyledAddButtonBig>

        </StyledBox>
      </StylesProvider>
    </Container>
  )
}

export default Add;