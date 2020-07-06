import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/AddRounded';
import ClearIcon from '@material-ui/icons/ClearRounded';
import { BoxTitle, BoxContent, ArrayBox, StyledIconButton } from '../styled';

interface EditServiceProps {
  billForm: Form;
  setBillForm: (value: React.SetStateAction<Form>) => void;
}

const EditService: React.FC<EditServiceProps> = ({ billForm,setBillForm }) => {
  const [serviceInput, setServiceInput] = useState<string>("");

  const handleServiceValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setServiceInput(e.target.value as string);

  const handleServiceAdd = () => {
    let serviceExists: boolean = false;

    if (serviceInput === "")
      return;

    billForm.service.map((item) => (item.name === serviceInput ? serviceExists = true : null));

    if (!serviceExists) {
      const newServices = billForm.service;
      newServices.push({ name: serviceInput });
      
      setBillForm({
        ...billForm,
        service: newServices
      });
    }
  }

  const handleServiceRemove = (idx: number) => {
    const newServices = billForm.service;

    newServices.splice(idx, 1);

    setBillForm({
      ...billForm,
      service: newServices
    })
  }

  return (
    <Grid item xs={12} sm={6}>
      <BoxTitle stickTop>
        서비스
      </BoxTitle>
      <BoxContent stickTop>
        <Input value={serviceInput} 
          onChange={handleServiceValueChange}
          placeholder="제공한 서비스를 입력해주세요."
          fullWidth
        />
        <StyledIconButton wide onClick={handleServiceAdd}>
          <AddIcon />
        </StyledIconButton>
      </BoxContent>

      {billForm.service.length !== 0 ?
        <ArrayBox>
        {billForm.service.map((service, index) => (
          <BoxContent stickTop key={index}>
            {service.name}
            <StyledIconButton onClick={() => {handleServiceRemove(index)}}>
              <ClearIcon />
            </StyledIconButton>
          </BoxContent>
        ))}
        </ArrayBox>
      : null}
    </Grid>
  )
}

export default EditService;