import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { BoxTitle } from '../styled';

interface EditMemoProps {
  billForm: Form;
  setBillForm: (value: React.SetStateAction<Form>) => void;
}

const EditMemo: React.FC<EditMemoProps> = ({ billForm, setBillForm }) => {
  const [memo, setMemo] = useState<string>(billForm.memo);

  const handleMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value as string);
    setBillForm({
      ...billForm,
      memo: e.target.value as string
    })
  }

  return (
    <Grid item xs={12}>
      <BoxTitle stickTop>
        메모
      </BoxTitle>
      <Input 
        value={memo}
        onChange={handleMemo}
        placeholder="메모를 입력하세요."
        fullWidth
      />
    </Grid>
  )
}

export default EditMemo;