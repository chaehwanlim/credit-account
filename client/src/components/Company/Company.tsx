import React from 'react';
import { Title, Company, StyledBox, BoxTitle, CompanyTitle, CompanyContent, CompanyArrayBox, MenuName, Price } from '../styled';
import Container from '@material-ui/core/Container';
import { StylesProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import companyFile from '../../../testdata/company';

const _Company: React.FC = () => {

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
                {companyFile.company}
              </CompanyContent>
            </Grid>

            <Grid item xs={12}>
              <CompanyTitle>
                주소
              </CompanyTitle>
              <CompanyContent>
                {companyFile.location}
              </CompanyContent>
            </Grid>

            <Grid item xs={12}>
              <CompanyTitle>
                전화번호
              </CompanyTitle>
              <CompanyContent>
                {companyFile.phone}
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
                      companyFile.menuDisplay.drink.map((item, index) => (
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
                      companyFile.menuDisplay.food.map((item, index) => (
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