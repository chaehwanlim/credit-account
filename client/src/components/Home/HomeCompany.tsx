import React, { useEffect } from 'react';
import { BoxHeader, StyledBox, HeaderButton, BoxContent, GreyContent, StyledDivider, Attribute, Info } from '../styled';
import LinearProgress from '@material-ui/core/LinearProgress';

const HomeCompany: React.FC<{ companyInfo: Company }> = ({ companyInfo }) => {
  if (!companyInfo){
    return <LinearProgress />
  }

  return (
    <StyledBox>
      <HeaderButton onClick={() => location.assign('/company')}>
        <BoxHeader>
          업체 정보&nbsp;&#xE001;
        </BoxHeader>
      </HeaderButton>

      <StyledDivider />

      <BoxContent>
        <GreyContent>
          업체명
        </GreyContent>
          {companyInfo.name}
      </BoxContent>

      <BoxContent>
        <GreyContent>
          사업자등록번호
        </GreyContent>
          {companyInfo.businessNumber}
      </BoxContent>
      
      <BoxContent>
        <GreyContent>
          주소
        </GreyContent>
          {companyInfo.location}
      </BoxContent>
      
      <BoxContent>
        <GreyContent>
          전화번호
        </GreyContent>
          {companyInfo.phone}
      </BoxContent>
      
    </StyledBox>
  )
}

export default HomeCompany;