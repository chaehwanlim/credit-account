import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { AddTitle, AddContent, AddContentItem } from '../styled';

interface EditPeopleProps {
  billForm: Form;
  setBillForm: (value: React.SetStateAction<Form>) => void;
}

const EditPeople: React.SFC<EditPeopleProps> = ({ billForm, setBillForm }) => {

  const handlePeople = (e: React.ChangeEvent<{ value: number }>) => {
    setBillForm({
      ...billForm,
      people: e.target.value
    });
  };

  const handleRep = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        value={billForm.people}
        onChange={handlePeople}
        fullWidth
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
      <AddTitle>
        인원
      </AddTitle>
      <AddContent>
        <Input 
          value={billForm.representative}
          onChange={handleRep}
          placeholder="모임의 대표자를 입력해주세요."
          fullWidth
        />
        <AddContentItem>
          포함
        </AddContentItem>
        <AddContentItem>
          <PeopleSelection />
        </AddContentItem>
      </AddContent>
    </Grid>
  )
}

export default EditPeople;