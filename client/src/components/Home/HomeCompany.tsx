import React, { useState, useEffect } from 'react';
import { StyledBox, BoxTitle, StyledDivider, BoxContent, Attribute, Info, HomeButton } from '../styled';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';

const HomeCompany: React.FC<{ companyInfo: Company }> = ({ companyInfo }) => {
  useEffect(() => {

  }, []);

  if (!companyInfo){
    return <LinearProgress />
  }

  return (
    <StyledBox>
      <HomeButton onClick={() => location.assign('/company')}>
        <BoxTitle>
          업체 정보&nbsp;&#xE001;
        </BoxTitle>
      </HomeButton>

      <StyledDivider />

      <BoxContent>
        <Attribute>
          업체명
        </Attribute>
        <Info>
          {companyInfo.name}
        </Info>
      </BoxContent>
      
      <BoxContent>
        <Attribute>
          주소
        </Attribute>
        <Info>
          {companyInfo.location}
        </Info>
      </BoxContent>
      
      <BoxContent>
        <Attribute>
          전화번호
        </Attribute>
        <Info>
          {companyInfo.phone}
        </Info>
      </BoxContent>
    </StyledBox>
  )
}

export default HomeCompany;