import React from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { AddTitle, AddContent, AddContentItem } from '../styled';

interface EditMemoProps {
  billForm: Form;
  setBillForm: (value: React.SetStateAction<Form>) => void;
}

const EditMemo: React.SFC<EditMemoProps> = ({ billForm, setBillForm }) => {

  const handleMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillForm({
      ...billForm,
      memo: e.target.value as string
    })
  }

  return (
    <Grid item xs={12}>
      <AddTitle>
        메모
      </AddTitle>
      <AddContent>
        <Input 
          value={billForm.memo}
          onChange={handleMemo}
          placeholder="메모를 입력하세요."
          fullWidth
        />
      </AddContent>
    </Grid>
  )
}

export default EditMemo;