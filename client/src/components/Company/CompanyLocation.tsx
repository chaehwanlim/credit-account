import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {CompanyTitle, CompanyInput, CompanyContent, SearchButton, CompanyArrayBox, SearchResult, SearchResultCompany, SearchResultLocation} from '../styled';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Axios from 'axios';

interface CompanyLocationProps {
  editEnabled: boolean;
  companyInfo: Company;
  companyEditForm: Company;
  handleEditForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCompanyEditForm: (value: React.SetStateAction<Company>) => void;
}

const CompanyLocation: React.SFC<CompanyLocationProps> = ({ editEnabled, companyInfo, companyEditForm, handleEditForm, setCompanyEditForm }) => {
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
      <CompanyTitle>
        주소
      </CompanyTitle>
      {editEnabled ? 
      <CompanyInput
        defaultValue={companyInfo.location}
        name="location"
        value={companyEditForm.location}
        onChange={handleEditForm}
      /> :
      <CompanyContent>
        {companyInfo.location}
      </CompanyContent>
      }
      {editEnabled ?
      <CompanyInput
        placeholder="업체명을 입력하세요."
        value={keyword}
        onChange={handleKeyword}
        endAdornment={
          <SearchButton onClick={handleSearch}>
            <SearchIcon />
          </SearchButton>
        }
      />
      : null}
      {result.length > 0 && editEnabled ? 
      <CompanyArrayBox>
        {result.map((item, index) => {
          const address: string = item.roadAddress !== '' ? item.roadAddress : item.address;

          return (
            <SearchResult onClick={() => handleResult(address)} fullWidth>
              <SearchResultCompany>
                {removeBTags(item.title)}
              </SearchResultCompany>
              <SearchResultLocation>
                {address}
              </SearchResultLocation>
            </SearchResult>
          )
        })}
      </CompanyArrayBox>
      : null}
    </Grid>
  )
}

export default CompanyLocation;