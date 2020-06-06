import React, { useState, useEffect } from 'react';
import { Title, Company, StyledBox, BoxTitle, CompanyTitle, CompanyContent, CompanyArrayBox, MenuName, Price } from '../styled';
import Container from '@material-ui/core/Container';
import { StylesProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';

const _Company: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  
  useEffect(() => {
    document.title = "외상장부 - 내 기업"

    Axios({
      method: 'get',
      url: `/api/company/${sessionStorage.getItem('companyID')}`
    })
    .then(res => setCompanyInfo(res.data[0]))
    .catch(err => console.log(err));
  }, [])

  if (!companyInfo) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>
        <Title>내 기업</Title>
        <Company>화끈불끈</Company>

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
              <CompanyContent>
                {companyInfo.name}
              </CompanyContent>
            </Grid>

            <Grid item xs={12}>
              <CompanyTitle>
                주소
              </CompanyTitle>
              <CompanyContent>
                {companyInfo.location}
              </CompanyContent>
            </Grid>

            <Grid item xs={12}>
              <CompanyTitle>
                전화번호
              </CompanyTitle>
              <CompanyContent>
                {companyInfo.phone}
              </CompanyContent>
            </Grid>

            <Grid item xs={12}>
              <CompanyTitle>
                메뉴
              </CompanyTitle>

              <CompanyArrayBox>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
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
          </Grid>
          

        </StyledBox>
      </StylesProvider>
    </Container>
  )
}

export default _Company;