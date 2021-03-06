import React, { useState, useEffect } from 'react';
import { PageTitle, PageSubtitle, StyledBox, BoxTitle, StyledButton, BoxContent, StyledInput } from '../styled';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import CompanyLocation from './CompanyLocation';
import CompanyMenu from './CompanyMenu';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const _Company: React.FC<{ setTitle: (title: string) => void }> = ({ setTitle }) => {
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [companyEditForm, setCompanyEditForm] = useState<Company | null>(null);
  const [companyEditFormBackup, setCompanyEditFormBackup] = useState<Company | null>(null);

  if (!sessionStorage.getItem('companyID')) {
    return <Redirect to="/login" />
  }
  
  useEffect(() => {
    setTitle('내 기업');

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

  const handleEditAccountForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyEditForm({
      ...companyEditForm,
      account: {
        ...companyEditForm.account,
        [e.target.name]: e.target.value
      }
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

  const handleCancle = () => {
    getCompanyInfo();
    setEditEnabled(false);
  }

  if (!companyInfo) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <PageTitle>내 기업</PageTitle>
      <PageSubtitle>{companyInfo.name}</PageSubtitle>

      <StyledBox>
        <Grid container
          direction="row"
          justify="space-between"
          alignItems="stretch"
          spacing={5}
        >
          <Grid item xs={12}>
            <BoxTitle stickTop>
              업체명
            </BoxTitle>
            {editEnabled ? 
              <StyledInput
                defaultValue={companyInfo.name}
                name="name"
                value={companyEditForm.name}
                onChange={handleEditForm}
                fullWidth
              /> :
              <BoxContent>
                {companyInfo.name}
              </BoxContent>
            }
          </Grid>

          <Grid item xs={12}>
            <BoxTitle stickTop>
              사업자등록번호
            </BoxTitle>
            {editEnabled ? 
              <StyledInput
                defaultValue={companyInfo.businessNumber}
                name="businessNumber"
                value={companyEditForm.businessNumber}
                onChange={handleEditForm}
                fullWidth
              /> :
              <BoxContent>
                {companyInfo.businessNumber}
              </BoxContent>
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
            <BoxTitle stickTop>
              전화번호
            </BoxTitle>
            {editEnabled ? 
            <StyledInput
              defaultValue={companyInfo.phone}
              name="phone"
              value={companyEditForm.phone}
              onChange={handleEditForm}
              fullWidth
            /> :
            <BoxContent>
              {companyInfo.phone}
            </BoxContent>
            }
          </Grid>

          <Grid item xs={12}>
            <BoxTitle stickTop>
              계좌
            </BoxTitle>
            {editEnabled ? 
            <span>
              <StyledInput
                placeholder="금융기관"
                defaultValue={companyInfo.account.bank}
                name="bank"
                value={companyEditForm.account.bank}
                onChange={handleEditAccountForm}
                fullWidth
              />
              <StyledInput
                placeholder="예금주"
                defaultValue={companyInfo.account.accountName}
                name="accountName"
                value={companyEditForm.account.accountName}
                onChange={handleEditAccountForm}
                fullWidth
              />
              <StyledInput
                placeholder="계좌번호"
                defaultValue={companyInfo.account.accountNumber}
                name="accountNumber"
                value={companyEditForm.account.accountNumber}
                onChange={handleEditAccountForm}
                fullWidth
              />
            </span>
              :
            <BoxContent>
              {companyInfo.account.bank && companyInfo.account.accountName && companyInfo.account.accountNumber ? 
              `${companyInfo.account.bank} · ${companyInfo.account.accountName} · ${companyInfo.account.accountNumber}` 
              : null}
            </BoxContent>
            }
          </Grid>

          <CompanyMenu
            editEnabled={editEnabled}
            companyInfo={companyInfo}
            companyEditForm={companyEditForm}
            setCompanyEditForm={setCompanyEditForm}
          />
          
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {editEnabled ? 
              <Grid item xs={6}>
                <StyledButton big onClick={handleCancle}>취소하기</StyledButton>
              </Grid> :
              <Grid item xs={12}>
                <StyledButton big colored onClick={toggleEdit}>수정하기</StyledButton>
              </Grid>}
              {editEnabled ?
              <Grid item xs={6}>
                <StyledButton big colored onClick={handleSave}>저장하기</StyledButton>
              </Grid> : null}
            </Grid>
          </Grid>
          
        </Grid>

      </StyledBox>
    </Container>
  )
}

export default _Company;