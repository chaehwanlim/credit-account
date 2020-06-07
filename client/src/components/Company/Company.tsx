import React, { useState, useEffect } from 'react';
import { Title, Company, StyledBox, BoxTitle, CompanyTitle, CompanyContent, CompanyArrayBox, MenuName, Price, CompanyButton, EditIcon, SaveIcon, CompanyInput } from '../styled';
import Container from '@material-ui/core/Container';
import { StylesProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';

const _Company: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [companyEditForm, setCompanyEditForm] = useState<Company | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  
  useEffect(() => {
    document.title = "외상장부 - 내 기업"

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

  const toggleSave = () => {
    Axios({
      method: 'put',
      url: `/api/company/${sessionStorage.getItem('companyID')}`,
      data: companyEditForm
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

            <Grid item xs={12}>
              <CompanyTitle>
                주소
              </CompanyTitle>
              {editEnabled ? 
              <CompanyInput
                defaultValue={companyInfo.location}
                name="location"
                value={companyEditForm.location}
                onChange={handleEditForm}
              /> :
              <CompanyContent>
                {companyInfo.location}
              </CompanyContent>
              }
            </Grid>

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

            <Grid item xs={12}>
              <CompanyTitle>
                메뉴
              </CompanyTitle>

              <CompanyArrayBox>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <CompanyTitle>
                      주류
                    </CompanyTitle>
                    {
                      companyInfo.menuDisplay.drink.map((item, index) => (
                        <CompanyContent>
                          <MenuName>
                            {item.name}
                          </MenuName>
                          <Price>
                            {item.price.toLocaleString()}원
                          </Price>
                        </CompanyContent>
                      ))
                    }
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CompanyTitle>
                      음식
                    </CompanyTitle>
                    {
                      companyInfo.menuDisplay.food.map((item, index) => (
                        <CompanyContent>
                          <MenuName>
                            {item.name}
                          </MenuName>
                          <Price>
                            {item.price.toLocaleString()}원
                          </Price>
                        </CompanyContent>
                      ))
                    }
                  </Grid>
                </Grid>
                
              </CompanyArrayBox>
            </Grid>

            <Grid item xs={12}>
              {editEnabled ? 
              <CompanyButton onClick={toggleSave}>
                <SaveIcon />저장하기
              </CompanyButton> :
              <CompanyButton onClick={toggleEdit}>
                <EditIcon />수정하기
              </CompanyButton>
              }
            </Grid>
          </Grid>
          

        </StyledBox>
      </StylesProvider>
    </Container>
  )
}

export default _Company;