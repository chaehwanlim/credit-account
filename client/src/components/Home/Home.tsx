import React, { useEffect, useState } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import HomeTransaction from './HomeTransaction';
import HomeCompany from './HomeCompany';
import HomeMenu from './HomeMenu';
import { Title, Company, HomeButton } from '../styled';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';

const Home: React.FC = () => {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [companyID, setCompanyID] = useState<string>('');
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);  

  useEffect(() => {
    const company = sessionStorage.getItem('companyID');

    if (company) {
      setCompanyID(company);
      setIsLogined(true);

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
        <Title>외상장부</Title>
        <Company>{companyInfo.name}</Company>
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