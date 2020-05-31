import React, { useEffect, useState } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import HomeTransaction from './HomeTransaction';
import HomeButtons from './HomeButtons';
import HomeCompany from './HomeCompany';
import HomeMenu from './HomeMenu';
import { Title, Company, HomeButton } from '../styled';
import billFile from '../../../testdata/bills';
import companyFile from '../../../testdata/company';


const Home: React.FC = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [companyName, setCompanyName] = useState<string>('화끈불끈');

  useEffect(() => {
    const company = sessionStorage.getItem('company');

    if (company) {
      //privateHome 반환
    }

  }, []);

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>

        <Title>외상장부</Title>
        <Company>{companyName}</Company>
        <Grid container spacing={2} 
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item md={6} xs={12}>
            <HomeTransaction />
          </Grid>
          <Grid item md={6} xs={12}>
            <HomeCompany />
          </Grid>
          <Grid item xs={12}>
            <HomeMenu />
          </Grid>
        </Grid>
      </StylesProvider>
    </Container>
  )
}

export default Home;