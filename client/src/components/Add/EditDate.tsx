import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { AddTitleFirst, AddContent } from '../styled';

interface EditDateProps {
  selectedDate: Date | null;
  handleDate: (date: Date | null) => void;
}

const EditDate: React.SFC<EditDateProps> = ({ selectedDate, handleDate }) => {

  return (
    <Grid item xs={12} sm={6}>
      <AddTitleFirst>
        날짜 선택
      </AddTitleFirst>
      <AddContent>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy년 MM월 dd일"
          margin="normal"
          id="date-picker-inline-local"
          value={selectedDate}
          onChange={handleDate}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          style={{
            margin: '0'
          }}
          fullWidth
        />
      </MuiPickersUtilsProvider>
      </AddContent>
    </Grid>
  )
}

export default EditDate;