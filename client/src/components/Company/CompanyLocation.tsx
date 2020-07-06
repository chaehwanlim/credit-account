import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { BoxTitle, BoxSubtitle, BoxContent, StyledInput, StyledIconButton, ArrayBox, SearchResult } from '../styled';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Axios from 'axios';

interface CompanyLocationProps {
  editEnabled: boolean;
  companyInfo: Company;
  companyEditForm: Company;
  handleEditForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCompanyEditForm: (value: React.SetStateAction<Company>) => void;
}

const CompanyLocation: React.FC<CompanyLocationProps> = ({ editEnabled, companyInfo, companyEditForm, handleEditForm, setCompanyEditForm }) => {
  const [keyword, setKeyword] = useState<string>('');
  const [result, setResult] = useState<any[]>([]);

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleSearch = () => {
    if (keyword === ''){
      alert('검색어를 한 자 이상 입력해주세요.'); 
      return;
    }

    Axios({
      method: 'get',
      url: `/api/search/location/${keyword}`
    })
    .then(res => setResult(res.data.items))
    .catch(err => console.log(err));
  }

  const handleResult = (address: string) => {
    setCompanyEditForm({
      ...companyEditForm,
      location: address
    });
  }

  const removeBTags = (str: string) => {
    str = str.replace(/<b>/g, "");
    return str.replace(/<\/b>/g, "");
  }

  return (
    <Grid item xs={12}>
      <BoxTitle stickTop>
        주소
      </BoxTitle>
      {editEnabled ? 
        <StyledInput
          defaultValue={companyInfo.location}
          name="location"
          value={companyEditForm.location}
          onChange={handleEditForm}
          fullWidth
        /> :
        <BoxContent>
          {companyInfo.location}
        </BoxContent>
      }
      {editEnabled ?
        <StyledInput
          placeholder="업체명으로 검색하세요."
          value={keyword}
          onChange={handleKeyword}
          endAdornment={
            <StyledIconButton onClick={handleSearch}>
              <SearchIcon />
            </StyledIconButton>
          }
          fullWidth
        /> : null
      }
      {result.length > 0 && editEnabled ? 
      <ArrayBox>
        {result.map((item, index) => {
          const address: string = item.roadAddress !== '' ? item.roadAddress : item.address;

          return (
            <SearchResult key={index} onClick={() => handleResult(address)} fullWidth>
              <BoxSubtitle>
                {removeBTags(item.title)}
              </BoxSubtitle>
              <BoxContent stickTop>
                {address}
              </BoxContent>
            </SearchResult>
          )
        })}
      </ArrayBox>
      : null}
    </Grid>
  )
}

export default CompanyLocation;