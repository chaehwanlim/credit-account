import React, { useState, useEffect } from 'react';
import { Title, Company, StyledBox, CompanyTitle, CompanySubtitle, CompanyContent, CompanyArrayBox, MenuName, Price, CompanyButton, CompanyInput, CompanyMenuInput, AddButton, RemoveButton } from '../styled';
import Container from '@material-ui/core/Container';
import { StylesProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import CompanyLocation from './CompanyLocation';
import CompanyMenu from './CompanyMenu';
import Axios from 'axios';

const _Company: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [companyEditForm, setCompanyEditForm] = useState<Company | null>(null);
  const [companyEditFormBackup, setCompanyEditFormBackup] = useState<Company | null>(null);
  
  useEffect(() => {
    document.title = "외상장부 - 내 기업";

    getCompanyInfo();
  }, []);

  const getCompanyInfo = () => {
    Axios({
      method: 'get',
      url: `/api/company/${sessionStorage.getItem('companyID')}`
    })
    .then(res => {
      setCompanyInfo(res.data[0]);
      setCompanyEditForm(res.data[0]);
      setCompanyEditFormBackup(res.data[0]);
    })
    .catch(err => console.log(err));
  }

  const handleEditForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyEditForm({
      ...companyEditForm,
      [e.target.name]: e.target.value
    });
  }

  const toggleEdit = () => {
    setEditEnabled(true);
  }

  const handleSave = () => {
    const newPrice = {};

    companyEditForm.menuDisplay.drink.map(item => {
      newPrice[item.name] = item.price;
    });

    companyEditForm.menuDisplay.food.map(item => {
      newPrice[item.name] = item.price;
    });

    Axios({
      method: 'put',
      url: `/api/company/${sessionStorage.getItem('companyID')}`,
      data: {
        ...companyEditForm,
        price: newPrice
      }
    })
    .then(res => {
      if (res.data.success === 1) {
        alert('성공적으로 수정했습니다!');
        setEditEnabled(false);
        getCompanyInfo();
      } else if (res.data.fail === 1)
        alert('다시 시도해 주세요.');
    })
  }

  const toggleCancle = () => {
    setEditEnabled(false);
    setCompanyEditForm(companyEditFormBackup);
  }

  if (!companyInfo) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>
        <Title>내 기업</Title>
        <Company>{companyInfo.name}</Company>

        <StyledBox>

          <Grid container
            direction="row"
            justify="space-between"
            alignItems="stretch"
            spacing={5}
          >
            <Grid item xs={12}>
              <CompanyTitle>
                업체명
              </CompanyTitle>
              {editEnabled ? 
              <CompanyInput
                defaultValue={companyInfo.name}
                name="name"
                value={companyEditForm.name}
                onChange={handleEditForm}
              /> :
              <CompanyContent>
                {companyInfo.name}
              </CompanyContent>
              }
            </Grid>

            <CompanyLocation
              editEnabled={editEnabled}
              companyInfo={companyInfo}
              companyEditForm={companyEditForm}
              handleEditForm={handleEditForm}
              setCompanyEditForm={setCompanyEditForm}
            />

            <Grid item xs={12}>
              <CompanyTitle>
                전화번호
              </CompanyTitle>
              {editEnabled ? 
              <CompanyInput
                defaultValue={companyInfo.phone}
                name="phone"
                value={companyEditForm.phone}
                onChange={handleEditForm}
              /> :
              <CompanyContent>
                {companyInfo.phone}
              </CompanyContent>
              }
            </Grid>

            <CompanyMenu
              editEnabled={editEnabled}
              companyInfo={companyInfo}
              companyEditForm={companyEditForm}
              handleEditForm={handleEditForm}
              setCompanyEditForm={setCompanyEditForm}
            />
            
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {editEnabled ? 
                <Grid item xs={6}>
                  <CompanyButton onClick={toggleCancle}>취소하기</CompanyButton>
                </Grid> :
                <Grid item xs={12}>
                  <CompanyButton onClick={toggleEdit}>수정하기</CompanyButton>
                </Grid>}
                {editEnabled ?
                <Grid item xs={6}>
                  <CompanyButton onClick={handleSave}>저장하기</CompanyButton>
                </Grid> : null}
              </Grid>
            </Grid>
            
          </Grid>

        </StyledBox>
      </StylesProvider>
    </Container>
  )
}

export default _Company;