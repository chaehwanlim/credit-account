import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import companyFile from '../../../testdata/company';
import { StyledBox, BoxTitle, BoxSubTitle, StyledDivider, BoxContent, Name, Price } from './styled';

const HomeMenu: React.FC = () => {

  useEffect(() => {
    console.log(companyFile.menuDisplay.food)
  }, []);

  return (
    <StyledBox>
      <BoxTitle>
        메뉴
      </BoxTitle>
      <StyledDivider />
      <Grid container>
        <Grid item xs={12} md={6}>
          <BoxSubTitle>
            주류
          </BoxSubTitle>
          {
            companyFile.menuDisplay.drink.map((item, index) => (
              <BoxContent key={index}>
                <Name>
                  {item.이름}
                </Name>
                <Price>
                  {item.가격}
                </Price>
              </BoxContent>
            ))
          }
        </Grid>
        <Grid item xs={12} md={6}>
          <BoxSubTitle>
            음식
          </BoxSubTitle>
          {
            companyFile.menuDisplay.food.map((item, index) => (
              <BoxContent key={index}>
                <Name>
                  {item.이름}
                </Name>
                <Price>
                  {item.가격}
                </Price>
              </BoxContent>
            ))
          }
        </Grid>
      </Grid>
    </StyledBox>
  )

}

export default HomeMenu;