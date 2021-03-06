import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { PageTitle, PageSubtitle, StyledBox, StyledButton, EditHeader, EditSubheader, StyledLink } from '../styled';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';
import EditDate from './EditDate';
import EditOrder from './EditOrder';
import EditService from './EditService';
import EditPeople from './EditPeople';
import EditMemo from './EditMemo';
import { Redirect } from 'react-router-dom';

interface EditProps {
  editMode: boolean;
  billID: string;
  billFormToEdit: Form | null;
  setTitle?: (title: string) => void;
}

const Edit: React.FC<EditProps> & { defaultProps: Partial<EditProps> } = ({ editMode, billID, billFormToEdit, setTitle }) => {
  const [billForm, setBillForm] = useState<Form>(billFormToEdit);
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);

  if (!sessionStorage.getItem('companyID')) {
    return <Redirect to="/login" />
  }

  useEffect(() => {
    if (editMode) {
      setTitle('수정');
    } else {
      setTitle('추가');
    }

    Axios({
      method: 'get',
      url: `/api/company/${sessionStorage.getItem('companyID')}`
    })
    .then(res => setCompanyInfo(res.data[0]))
    .then(() => {
      if (!editMode)
        calculateTotal()
    })
    .catch(err => console.log(err));

  }, []);

  const calculateTotal = () => {
    let total = 0;

    billForm.order.map((item) => {
      if (item.name === "") return;
      
      total = total + item.quantity * companyInfo.price[item.name];
    });

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
        companyID: sessionStorage.getItem('companyID'),
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

  const submitEditBill = (e: React.MouseEvent<HTMLButtonElement>) => {
    Axios({
      method: 'put',
      url: `/api/bills/${billID}`,
      data: {
        ...billForm,
        companyID: sessionStorage.getItem('companyID'),
        isDeleted: 0
      }
    })
    .then(res => {
      if (res.data.success === 1) {
        alert('계산서를 수정했습니다!');
        location.assign('/bill');
      } else if (res.data.fail === 1) {
        alert('계산서 수정에 오류가 발생했습니다. 다시 시도해주세요.');
      }
    })
    .catch(err => console.log(err));
  }

  if(!companyInfo) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <PageTitle>{editMode ? "수정" : "추가"}</PageTitle>
      <PageSubtitle>{companyInfo.name}</PageSubtitle>
      
      <StyledBox>
        <Grid container
          direction="row"
          justify="space-between"
          alignItems="stretch"
          spacing={5}
        >

          <EditDate 
            billForm={billForm}
            setBillForm={setBillForm}
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
            billForm={billForm}
            setBillForm={setBillForm}
          />

          <EditMemo
            billForm={billForm}
            setBillForm={setBillForm}
          />
          
        </Grid>

        <EditHeader>
          합계 {billForm.total.toLocaleString()}원
        </EditHeader>
        <EditSubheader>
          1인 {(billForm.total / billForm.people).toLocaleString()}원
        </EditSubheader>

        {editMode ? 
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <StyledLink to="/bill">
              <StyledButton big >
                취소하기
              </StyledButton>
            </StyledLink>
          </Grid>
          <Grid item xs={6}>
            <StyledButton big colored={true} onClick={submitEditBill}>
              수정하기
            </StyledButton>
          </Grid>
        </Grid>
        : 
        <StyledButton big colored={true} onClick={submitForm}>
          추가하기
        </StyledButton>}

      </StyledBox>
    </Container>
  )
}

Edit.defaultProps = {
  editMode: false,
  billID: '',
  billFormToEdit: {
    date: new Date(),
    people: 1,
    representative: "",
    order: [],
    service: [],
    memo: "",
    total: 0,
    isPaid: 0
  }
}

export default Edit;