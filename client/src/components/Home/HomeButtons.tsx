import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { StyledBox, HomeButton } from '../styled';

const HomeButtons: React.FC = () => {
  return (
    <Grid container
      direction="column"
      justify="space-between"
      alignItems="stretch"
      spacing={1}
    >
      <Grid item xs={12}>
        <HomeButton onClick={() => location.assign('/bill')}>
          계산서 보기
        </HomeButton>
      </Grid>
      <Grid item xs={12}>
        <HomeButton onClick={() => location.assign('/add')}>
          추가하기
        </HomeButton>
      </Grid>
      <Grid item xs={12}>
        <HomeButton onClick={() => location.assign('/company')}>
          기업 수정
        </HomeButton>
      </Grid>
    </Grid>
  )
}

export default HomeButtons;