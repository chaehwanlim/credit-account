import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddRounded';
import ClearIcon from '@material-ui/icons/ClearRounded';
import { AddTitle, AddContent, AddContentItem, AddArrayBox, MenuName, Quantity, QuantityButton } from '../styled';

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
      <AddTitle>
        서비스
      </AddTitle>
      <AddContent>
        <Input value={serviceInput} 
          onChange={handleServiceValueChange}
          placeholder="제공한 서비스를 입력해주세요."
          fullWidth
        />
        <AddContentItem>
          <IconButton onClick={handleServiceAdd}>
            <AddIcon />
          </IconButton>
        </AddContentItem>
      </AddContent>

      {billForm.service.length !== 0 ?
        <AddArrayBox>
        {
          billForm.service.map((service, index) => (
            <AddContent>
              <MenuName>
                {service.name}
              </MenuName>
              <Quantity>
                <QuantityButton onClick={() => {handleServiceRemove(index)}}><ClearIcon /></QuantityButton>
              </Quantity>
            </AddContent>
          ))
        }
        </AddArrayBox>
      : null}
    </Grid>
  )
}

export default EditService;