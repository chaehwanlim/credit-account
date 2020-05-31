import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import companyFile from '../../../testdata/company';
import { StyledBox, BoxTitle, BoxSubTitle, StyledDivider, BoxContent, MenuName, Price, HomeButton } from '../styled';

const HomeMenu: React.FC = () => {

  return (
    <StyledBox>
      <HomeButton onClick={() => location.assign('/company')}>
        <BoxTitle>
          메뉴&nbsp;&#xE001;
        </BoxTitle>
      </HomeButton>
      <StyledDivider />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <BoxSubTitle>
            주류
          </BoxSubTitle>
          {
            companyFile.menuDisplay.drink.map((item, index) => (
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
        <Grid item xs={6}>
          <BoxSubTitle>
            음식
          </BoxSubTitle>
          {
            companyFile.menuDisplay.food.map((item, index) => (
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