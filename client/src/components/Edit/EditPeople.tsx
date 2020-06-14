import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { BoxTitle, BoxContent, GreyContent } from '../styled';

interface EditPeopleProps {
  billForm: Form;
  setBillForm: (value: React.SetStateAction<Form>) => void;
}

const EditPeople: React.FC<EditPeopleProps> = ({ billForm, setBillForm }) => {
  const [people, setPeople] = useState<number>(billForm.people);
  const [representative, setRepresentative] = useState<string>(billForm.representative);

  const handlePeople = (e: React.ChangeEvent<{ value: number }>) => {
    setPeople(e.target.value);
    setBillForm({
      ...billForm,
      people: e.target.value
    });
  };

  const handleRep = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepresentative(e.target.value as string);
    setBillForm({
      ...billForm,
      representative: e.target.value as string
    });
  }

  const PeopleSelection: React.FC = () => {
    const menuItems = [];
    
    for(let i=1; i<=12; i++) {
      menuItems.push({ value: i, name: `${i}명` });
    }

    return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={people}
        onChange={handlePeople}
        style={{minWidth: '6rem'}}
      >
      {menuItems.map((item, index) => (
        <MenuItem value={item.value} key={index}>{item.name}</MenuItem>
      ))
      }
      </Select>
    )
  }

  return (
    <Grid item xs={12} sm={6}>
      <BoxTitle stickTop>
        인원
      </BoxTitle>
      <BoxContent>
        <Input 
          value={representative}
          onChange={handleRep}
          placeholder="모임의 대표자를 입력해주세요."
          fullWidth
        />
        <GreyContent edit>
        포함
        </GreyContent>
        <PeopleSelection />
      </BoxContent>
    </Grid>
  )
}

export default EditPeople;