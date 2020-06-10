import React, { useState, useEffect } from 'react';
import { Title, Company, StyledBox, BoxTitle, CompanyTitle, CompanySubtitle, CompanyContent, CompanyArrayBox, MenuName, Price, CompanyButton, EditIcon, SaveIcon, CompanyInput, SearchButton, SearchResult, SearchResultCompany, SearchResultLocation, CompanyMenuInput, AddButton, RemoveButton } from '../styled';
import Container from '@material-ui/core/Container';
import { StylesProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import SearchIcon from '@material-ui/icons/SearchRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import ClearIcon from '@material-ui/icons/ClearRounded';
import MaterialTable, { Column } from 'material-table';
import Axios from 'axios';
import { formatISODuration } from 'date-fns/esm';

const _Company: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [companyEditForm, setCompanyEditForm] = useState<Company | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [result, setResult] = useState<any[]>([]);
  const [drinkInput, setDrinkInput] = useState<string>('');
  const [foodInput, setFoodInput] = useState<string>('');
  
  useEffect(() => {
    document.title = "외상장부 - 내 기업"

    getCompanyInfo();
  }, []);

  const getCompanyInfo = () => {
    Axios({
      method: 'get',
      url: `/api/company/${sessionStorage.getItem('companyID')}`
    })
    .then(res => {
      setCompanyInfo(res.data[0]);
      setCompanyEditForm(res.data[0]);
    })
    .catch(err => console.log(err));
  }

  const handleEditForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyEditForm({
      ...companyEditForm,
      [e.target.name]: e.target.value
    });
  }

  const toggleEdit = () => {
    setEditEnabled(true);
  }

  const toggleSave = () => {
    Axios({
      method: 'put',
      url: `/api/company/${sessionStorage.getItem('companyID')}`,
      data: companyEditForm
    })
    .then(res => {
      if (res.data.success === 1) {
        alert('성공적으로 수정했습니다!');
        setEditEnabled(false);
        getCompanyInfo();
      } else if (res.data.fail === 1)
        alert('다시 시도해 주세요.');
    })
  }

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

  const removeBTags = (str: string) => {
    str = str.replace(/<b>/g, "");
    return str.replace(/<\/b>/g, "");
  }

  const handleResult = (address: string) => {
    setCompanyEditForm({
      ...companyEditForm,
      location: address
    });
  }

  const handleMenuChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newMenuArray = companyEditForm.menuDisplay[e.target.name];

    newMenuArray[index].name = e.target.value as string;

    setCompanyEditForm({
      ...companyEditForm,
      menuDisplay: {
        ...companyEditForm.menuDisplay,
        [e.target.name]: newMenuArray
      }
    });
  }

  const handlePriceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newMenuArray = companyEditForm.menuDisplay[e.target.name];

    newMenuArray[index].price = parseInt(e.target.value.match(/\d+/g).join(''));

    setCompanyEditForm({
      ...companyEditForm,
      menuDisplay: {
        ...companyEditForm.menuDisplay,
        [e.target.name]: newMenuArray
      }
    });

    console.log(companyEditForm.menuDisplay[e.target.name]);
  }

  const handleMenuInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'drink') {
      setDrinkInput(e.target.value);
    } else if (e.target.name === 'food') {
      setFoodInput(e.target.value);
    }
  }

  const handleMenuAdd = (menuType: string) => {
    const newMenuArray = companyEditForm.menuDisplay[menuType];

    if (menuType === 'drink') {
      newMenuArray.push({ "name": drinkInput, "price": 0 });
    } else if (menuType === 'food') {
      newMenuArray.push({ "name": foodInput, "price": 0 });
    }
    
    setCompanyEditForm({
      ...companyEditForm,
      menuDisplay: {
        ...companyEditForm.menuDisplay,
        [menuType]: newMenuArray
      }
    });

  }

  const handleMenuRemove = (index: number, menuType: string) => {
    const newMenuArray = companyEditForm.menuDisplay[menuType];

    newMenuArray.splice(index, 1);

    setCompanyEditForm({
      ...companyEditForm,
      menuDisplay: {
        ...companyEditForm.menuDisplay,
        [menuType]: newMenuArray
      }
    });
  }

  if (!companyInfo) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>
        <Title>내 기업</Title>
        <Company>{companyInfo.name}</Company>

        <StyledBox>

          <Grid container
            direction="row"
            justify="space-between"
            alignItems="stretch"
            spacing={5}
          >
            <Grid item xs={12}>
              <CompanyTitle>
                업체명
              </CompanyTitle>
              {editEnabled ? 
              <CompanyInput
                defaultValue={companyInfo.name}
                name="name"
                value={companyEditForm.name}
                onChange={handleEditForm}
              /> :
              <CompanyContent>
                {companyInfo.name}
              </CompanyContent>
              }
              
            </Grid>

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

            <Grid item xs={12}>
              <CompanyTitle>
                전화번호
              </CompanyTitle>
              {editEnabled ? 
              <CompanyInput
                defaultValue={companyInfo.phone}
                name="phone"
                value={companyEditForm.phone}
                onChange={handleEditForm}
              /> :
              <CompanyContent>
                {companyInfo.phone}
              </CompanyContent>
              }
            </Grid>

            <Grid item xs={12}>
              <CompanyTitle>
                메뉴
              </CompanyTitle>

                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <CompanySubtitle>
                      음료
                    </CompanySubtitle>
                    {editEnabled ?
                      <CompanyContent>
                        <CompanyInput 
                          placeholder="추가할 음료를 입력해주세요."
                          name="drink"
                          value={drinkInput}
                          onChange={handleMenuInput}
                          endAdornment={
                            <AddButton onClick={handleMenuAdd.bind(this, "drink")}>
                              <AddIcon />
                            </AddButton>
                          }
                        />
                      </CompanyContent>
                    : null}
                    {editEnabled ? 
                      <CompanyArrayBox>
                      {companyEditForm.menuDisplay.drink.map((item, index) => (
                        <CompanyContent>
                          <CompanyMenuInput 
                            defaultValue={item.name} 
                            value={companyEditForm.menuDisplay.drink[index].name} 
                            name="drink"
                            onChange={handleMenuChange.bind(this, index)}
                          />
                          <CompanyMenuInput 
                            defaultValue={item.price}
                            value={companyEditForm.menuDisplay.drink[index].price}
                            name="drink"
                            onChange={handlePriceChange.bind(this, index)} 
                          />
                          <RemoveButton onClick={() => handleMenuRemove(index, "drink")}>
                            <ClearIcon />
                          </RemoveButton>
                        </CompanyContent>
                      ))}
                      </CompanyArrayBox> :
                      companyInfo.menuDisplay.drink.map((item, index) => (
                        <CompanyContent>
                          <MenuName>
                            {item.name}
                          </MenuName>
                          <Price>
                            {item.price.toLocaleString()}원
                          </Price>
                        </CompanyContent>
                      ))
                    }
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CompanySubtitle>
                      음식
                    </CompanySubtitle>
                    {editEnabled ?
                      <CompanyContent>
                        <CompanyInput 
                          placeholder="추가할 음식을 입력해주세요."
                          name="food"
                          value={foodInput}
                          onChange={handleMenuInput}
                          endAdornment={
                            <AddButton onClick={handleMenuAdd.bind(this, "food")}>
                              <AddIcon />
                            </AddButton>
                          }
                        />
                      </CompanyContent>
                    : null}
                    {editEnabled ?
                      <CompanyArrayBox>
                      {companyEditForm.menuDisplay.food.map((item, index) => (
                        <CompanyContent>
                          <CompanyMenuInput 
                            defaultValue={item.name} 
                            value={companyEditForm.menuDisplay.food[index].name} 
                            name="food"
                            onChange={handleMenuChange.bind(this, index)}
                          />
                          <CompanyMenuInput 
                            defaultValue={item.price}
                            value={companyEditForm.menuDisplay.food[index].price}
                            name="food"
                            onChange={handlePriceChange.bind(this, index)} 
                          />
                          <RemoveButton onClick={() => handleMenuRemove(index, "food")}>
                            <ClearIcon />
                          </RemoveButton>
                        </CompanyContent>
                      ))}
                      </CompanyArrayBox> : 
                      companyInfo.menuDisplay.food.map((item, index) => (
                        <CompanyContent>
                          <MenuName>
                            {item.name}
                          </MenuName>
                          <Price>
                            {item.price.toLocaleString()}원
                          </Price>
                        </CompanyContent>
                      ))
                    }
                  </Grid>
                </Grid>

            </Grid>

            <Grid item xs={12}>
              {editEnabled ? 
              <CompanyButton onClick={toggleSave}>
                <SaveIcon />저장하기
              </CompanyButton> :
              <CompanyButton onClick={toggleEdit}>
                <EditIcon />수정하기
              </CompanyButton>
              }
            </Grid>
          </Grid>
          

        </StyledBox>
      </StylesProvider>
    </Container>
  )
}

export default _Company;