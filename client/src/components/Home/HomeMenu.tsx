import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { StyledBox, BoxTitle, BoxSubTitle, StyledDivider, BoxContent, MenuName, Price, HomeButton } from '../styled';

const HomeMenu: React.SFC<{ companyInfo: Company }> = ({ companyInfo }) => {

  return (
    <StyledBox>
      <HomeButton onClick={() => location.assign('/company')}>
        <BoxTitle>
          메뉴&nbsp;&#xE001;
        </BoxTitle>
      </HomeButton>
      <StyledDivider />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <BoxSubTitle>
            주류
          </BoxSubTitle>
          {
            companyInfo.menuDisplay.drink.map((item, index) => (
              <BoxContent key={index}>
                <MenuName>
                  {item.name}
                </MenuName>
                <Price>
                  {item.price.toLocaleString()}원
                </Price>
              </BoxContent>
            ))
          }
        </Grid>
        <Grid item xs={12} sm={6}>
          <BoxSubTitle>
            음식
          </BoxSubTitle>
          {
            companyInfo.menuDisplay.food.map((item, index) => (
              <BoxContent key={index}>
                <MenuName>
                  {item.name}
                </MenuName>
                <Price>
                  {item.price.toLocaleString()}원
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