import React from 'react';
import Grid from '@material-ui/core/Grid';
import { BoxHeader, StyledBox, HeaderButton, GreyTitle, StyledDivider, BoxContent, GreyContent } from '../styled';

const HomeMenu: React.FC<{ companyInfo: Company }> = ({ companyInfo }) => {

  return (
    <StyledBox>
      <HeaderButton onClick={() => location.assign('/company')}>
        <BoxHeader>
          메뉴&nbsp;&#xE001;
        </BoxHeader>
      </HeaderButton>

      <StyledDivider />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <GreyTitle>
            음식
          </GreyTitle>
          {companyInfo.menuDisplay.food.map((item, index) => (
            <BoxContent key={index}>
              {item.name}
              <GreyContent>
                {item.price.toLocaleString()}원
              </GreyContent>
            </BoxContent>
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          <GreyTitle>
            음료
          </GreyTitle>
          {companyInfo.menuDisplay.drink.map((item, index) => (
            <BoxContent key={index}>
              {item.name}
              <GreyContent>
                {item.price.toLocaleString()}원
              </GreyContent>
            </BoxContent>
          ))}
        </Grid>
      </Grid>
    </StyledBox>
  )

}

export default HomeMenu;