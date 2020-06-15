import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { BoxTitle, BoxContent, GreyTitle, GreyContent, ArrayBox, StyledInput, StyledIconButton } from '../styled';
import AddIcon from '@material-ui/icons/AddRounded';
import ClearIcon from '@material-ui/icons/ClearRounded';

interface CompanyMenuProps {
  editEnabled: boolean;
  companyInfo: Company;
  companyEditForm: Company;
  setCompanyEditForm: (value: React.SetStateAction<Company>) => void;
}

const CompanyMenu: React.FC<CompanyMenuProps> = ({ editEnabled, companyInfo, companyEditForm, setCompanyEditForm }) => {
  const [drinkInput, setDrinkInput] = useState<string>('');
  const [foodInput, setFoodInput] = useState<string>('');

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

  return (
    <Grid item xs={12}>
      <BoxTitle>
        메뉴
      </BoxTitle>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <GreyTitle marginTop>
              음료
            </GreyTitle>
            {editEnabled ?
              <StyledInput 
                placeholder="추가할 음료를 입력해주세요."
                name="drink"
                value={drinkInput}
                onChange={handleMenuInput}
                endAdornment={
                  <StyledIconButton onClick={handleMenuAdd.bind(this, "drink")}>
                    <AddIcon />
                  </StyledIconButton>
                }
                fullWidth
              />
            : null}
            {editEnabled ? 
              <ArrayBox>
              {companyEditForm.menuDisplay.drink.map((item, index) => (
                <BoxContent noSpace>
                  <StyledInput noSpace
                    defaultValue={item.name} 
                    value={companyEditForm.menuDisplay.drink[index].name} 
                    name="drink"
                    onChange={handleMenuChange.bind(this, index)}
                  />
                  <StyledInput noSpace
                    defaultValue={item.price}
                    value={companyEditForm.menuDisplay.drink[index].price}
                    name="drink"
                    onChange={handlePriceChange.bind(this, index)} 
                  />
                  <StyledIconButton onClick={() => handleMenuRemove(index, "drink")}>
                    <ClearIcon />
                  </StyledIconButton>
                </BoxContent>
              ))}
              </ArrayBox> :
              companyInfo.menuDisplay.drink.map((item, index) => (
                <BoxContent>
                  {item.name}
                  <GreyContent>
                    {item.price.toLocaleString()}원
                  </GreyContent>
                </BoxContent>
              ))
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <GreyTitle marginTop>
              음식
            </GreyTitle>
            {editEnabled ?
              <StyledInput 
                placeholder="추가할 음식을 입력해주세요."
                name="food"
                value={foodInput}
                onChange={handleMenuInput}
                endAdornment={
                  <StyledIconButton onClick={handleMenuAdd.bind(this, "food")}>
                    <AddIcon />
                  </StyledIconButton>
                }
                fullWidth
              />
            : null}
            {editEnabled ?
              <ArrayBox>
              {companyEditForm.menuDisplay.food.map((item, index) => (
                <BoxContent noSpace>
                  <StyledInput noSpace
                    defaultValue={item.name} 
                    value={companyEditForm.menuDisplay.food[index].name} 
                    name="food"
                    onChange={handleMenuChange.bind(this, index)}
                  />
                  <StyledInput noSpace
                    defaultValue={item.price}
                    value={companyEditForm.menuDisplay.food[index].price}
                    name="food"
                    onChange={handlePriceChange.bind(this, index)} 
                  />
                  <StyledIconButton onClick={() => handleMenuRemove(index, "food")}>
                    <ClearIcon />
                  </StyledIconButton>
                </BoxContent>
              ))}
              </ArrayBox> : 
              companyInfo.menuDisplay.food.map((item, index) => (
                <BoxContent>
                    {item.name}
                  <GreyContent>
                    {item.price.toLocaleString()}원
                  </GreyContent>
                </BoxContent>
              ))
            }
          </Grid>
        </Grid>

    </Grid>
  )
}

export default CompanyMenu;