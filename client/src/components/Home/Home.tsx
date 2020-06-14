import React, { useEffect, useState } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import HomeTransaction from './HomeTransaction';
import HomeCompany from './HomeCompany';
import HomeMenu from './HomeMenu';
import { PageTitle, PageSubtitle } from '../styled';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';

const Home: React.FC<{ setTitle: (title: string) => void }> = ({ setTitle }) => {
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);  

  useEffect(() => {
    const company = sessionStorage.getItem('companyID');

    setTitle('홈');
<<<<<<< HEAD
<<<<<<< HEAD
    document.title = '외상장부 - 홈';
=======
>>>>>>> 0e6ef6ee47d45c3827662c12dc2e32f73823ba06
=======
>>>>>>> 0e6ef6ee47d45c3827662c12dc2e32f73823ba06

    if (company) {
      Axios({
        method: 'get',
        url: `/api/company/${company}`
      })
      .then(res => setCompanyInfo(res.data[0]))
      .catch(err => console.log(err));

    } else {
      location.assign('/login');
    }

  }, []);

  if (!companyInfo) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>
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

      </StylesProvider>
    </Container>
  )
}

export default Home;