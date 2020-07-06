import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import HomeTransaction from './HomeTransaction';
import HomeCompany from './HomeCompany';
import HomeMenu from './HomeMenu';
import { PageTitle, PageSubtitle } from '../styled';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const Home: React.FC<{ setTitle: (title: string) => void }> = ({ setTitle }) => {
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);  

  if (!sessionStorage.getItem('companyID')) {
    return <Redirect to="/login" />
  }

  useEffect(() => {
    const company = sessionStorage.getItem('companyID');

    setTitle('홈');

    if (company) {
      Axios({
        method: 'get',
        url: `/api/company/${company}`
      })
      .then(res => setCompanyInfo(res.data[0]))
      .catch(err => console.log(err));
    }

  }, []);

  if (!companyInfo) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <PageTitle>외상장부</PageTitle>
      <PageSubtitle>{companyInfo.name}</PageSubtitle>

      <Grid container spacing={2} 
        direction="row"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item md={6} xs={12}>
          <HomeTransaction companyInfo={companyInfo} />
        </Grid>
        <Grid item md={6} xs={12}>
          <HomeCompany companyInfo={companyInfo} />
        </Grid>
        <Grid item xs={12}>
          <HomeMenu companyInfo={companyInfo} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home;