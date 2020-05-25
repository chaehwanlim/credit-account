import React, { useState, useEffect } from 'react';
import companyFile from '../../../testdata/company';
import { StyledBox, BoxTitle, StyledDivider, BoxContent, Attribute, Info, Name, Price } from './styled';

const HomeCompany: React.FC = () => {
  const [company, setCompany] = useState({});

  return (
    <StyledBox>
      <BoxTitle>
        업체 정보
      </BoxTitle>

      <StyledDivider />

      <BoxContent>
        <Attribute>
          업체명
        </Attribute>
        <Info>
          {companyFile.company}
        </Info>
      </BoxContent>
      
      <BoxContent>
        <Attribute>
          주소
        </Attribute>
        <Info>
          {companyFile.location}
        </Info>
      </BoxContent>
      
      <BoxContent>
        <Attribute>
          전화번호
        </Attribute>
        <Info>
          {companyFile.phone}
        </Info>
      </BoxContent>
    </StyledBox>
  )
}

export default HomeCompany;