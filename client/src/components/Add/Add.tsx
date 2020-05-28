import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Title, Company, StyledBox, BoxSubTitle } from '../styled';


const Add: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date('2014-08-18T21:11:54'));

  useEffect(() => {
    document.title = "외상장부 - 추가";
    console.log(new Date().getTime());
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>

        <Title>추가</Title>
        <Company>화끈불끈</Company>
        
        <StyledBox>
          <BoxSubTitle>
            날짜 선택
          </BoxSubTitle>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </StyledBox>

      </StylesProvider>
    </Container>
  )
}

export default Add;