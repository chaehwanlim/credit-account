import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Title, Company, StyledBox, AddTitleFirst, AddTitle, AddContent, AddContentItem, AddTotal, StyledAddButtonBig, AddArrayBox, MenuName, Quantity, QuantityButton, AddTotalPerPerson } from '../styled';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddIcon from '@material-ui/icons/AddRounded';
import RemoveIcon from '@material-ui/icons/RemoveRounded';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/ClearRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';

const dateToString = (date: Date | null) => {
  let dateStr = ""

  dateStr = dateStr.concat(date.getFullYear().toString());
  
  if (date.getMonth() + 1 < 10) {
    dateStr = dateStr.concat("0" + (date.getMonth() + 1).toString());
  } else {
    dateStr = dateStr.concat((date.getMonth() + 1).toString());
  }

  if (date.getDate() < 10) {
    dateStr = dateStr.concat("0" + date.getDate().toString());
  } else {
    dateStr = dateStr.concat(date.getDate().toString());
  }

  return dateStr;
}

const Add: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [billForm, setBillForm] = useState<Form>({
    date: dateToString(selectedDate),
    people: 1,
    representative: "",
    order: [],
    service: [],
    memo: "",
    total: 0
  });
  const [selectedOrder, setSelectedOrder] = useState<string>("메뉴를 선택해주세요.");
  const [serviceInput, setServiceInput] = useState<string>("");
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);

  useEffect(() => {
    document.title = "외상장부 - 추가";

    Axios({
      method: 'get',
      url: `/api/company/${sessionStorage.getItem('companyID')}`
    })
    .then(res => setCompanyInfo(res.data[0]))
    .catch(err => console.log(err));

    calculateTotal();

  }, [selectedDate, billForm.people, billForm.representative]);

  

  const handleDate = (date: Date | null) => {
    setSelectedDate(date);
  }

  const handleRep = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillForm({
      ...billForm,
      representative: e.target.value as string
    });
  }

  const handlePeople = (e: React.ChangeEvent<{ value: number }>) => {
    setBillForm({
      ...billForm,
      people: e.target.value
    });
  };

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

  const handleOrder = (e: React.ChangeEvent<{ value: string }>) => setSelectedOrder(e.target.value);

  const OrderSelection: React.FC = () => (
    <Select 
      defaultValue="" 
      id="grouped-select"
      value={selectedOrder}
      onChange={handleOrder}
      fullWidth
    >
      <MenuItem value="메뉴를 선택해주세요.">
        메뉴를 선택해주세요.
      </MenuItem>
      <ListSubheader>
        주류
      </ListSubheader>
      {
        companyInfo.menuDisplay.drink.map((item, index) => (
        <MenuItem value={item.name} key={index}>{item.name} · {item.price.toLocaleString()}원</MenuItem>
        ))
      }
      <ListSubheader>
        음식
      </ListSubheader>
      {
        companyInfo.menuDisplay.food.map((item, index) => (
        <MenuItem value={item.name} key={index}>{item.name} · {item.price.toLocaleString()}원</MenuItem>
        ))
      }
    </Select>
  )

  const handleOrderAdd = () => {
    let orderExists: boolean = false;

    if(selectedOrder === "메뉴를 선택해주세요.")
      return;

    billForm.order.map((item) => {
      if (item.name === selectedOrder) {
        item.quantity = item.quantity + 1;
        orderExists = true;
      }
    });

    if (!orderExists) {
      const newOrders = billForm.order;
      newOrders.push({ name: selectedOrder, quantity: 1});

      setBillForm({
        ...billForm,
        order: newOrders
      });
    }

    calculateTotal();
  }

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

  const handleMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillForm({
      ...billForm,
      memo: e.target.value as string
    })
  }

  const calculateTotal = () => {
    let total = 0;

    billForm.order.map((item) => (total = total + item.quantity * companyInfo.price[item.name]));

    setBillForm({
      ...billForm,
      total: total
    });
  }

  const handleQuantityAdd = (idx: number) => {
    const newOrders = billForm.order;

    newOrders[idx].quantity = newOrders[idx].quantity + 1;

    setBillForm({
      ...billForm,
      order: newOrders
    })

    calculateTotal();
  }

  const handleQuantityRemove = (idx: number) => {
    const newOrders = billForm.order;

    if (newOrders[idx].quantity === 1) {
      newOrders.splice(idx, 1);
    } else {
      newOrders[idx].quantity = newOrders[idx].quantity - 1;
    }

    setBillForm({
      ...billForm,
      order: newOrders
    })

    calculateTotal();
  }

  const handleQuantityRemoveAll = (idx: number) => {
    const newOrders = billForm.order;

    newOrders.splice(idx, 1);

    setBillForm({
      ...billForm,
      order: newOrders
    })

    calculateTotal();
  }

  const handleServiceRemove = (idx: number) => {
    const newServices = billForm.service;

    newServices.splice(idx, 1);

    setBillForm({
      ...billForm,
      service: newServices
    })
  }

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (billForm.representative === '') {
      alert('대표자를 입력해주세요.');
      return;
    }
    if (billForm.order.length === 0) {
      alert('메뉴를 1개 이상 선택해주세요.');
      return;
    }

    Axios({
      method: 'post',
      url: '/api/bills',
      data: {
        ...billForm,
        date: dateToString(selectedDate),
        companyID: sessionStorage.getItem('companyID'),
        isPaid: 0,
        isDeleted: 0
      }
    })
    .then(res => {
      if (res.data.success === 1) {
        alert('계산서를 추가했습니다!');
        location.assign('/bill');
      } else if (res.data.fail === 1) {
        alert('계산서 추가에 오류가 발생했습니다. 다시 시도해주세요.');
      }
    })
    .catch(err => console.log(err));
  }

  if(!companyInfo) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>

        <Title>추가</Title>
        <Company>{companyInfo.name}</Company>
        
        <StyledBox>

          <Grid container
            direction="row"
            justify="space-between"
            alignItems="stretch"
            spacing={5}
          >

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
                    'aria-label': 'change date',
                  }}
                  style={{
                    margin: '0'
                  }}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
              </AddContent>
            </Grid>
            
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
            
            <Grid item xs={12} sm={6}>
              <AddTitle>
                주문
              </AddTitle>
              <AddContent>
                <OrderSelection />
                <AddContentItem>
                  <IconButton onClick={handleOrderAdd}>
                    <AddIcon />
                  </IconButton>
                </AddContentItem>
              </AddContent>

              {billForm.order.length !== 0 ? 
                <AddArrayBox>
                {
                  billForm.order.map((order, index) => (
                    <AddContent>
                      <MenuName>
                        {order.name}
                        &nbsp;·&nbsp;
                        {order.quantity}
                      </MenuName>
                      
                      <Quantity>
                        <QuantityButton onClick={() => {handleQuantityAdd(index)}}><AddIcon />
                        </QuantityButton>
                        <QuantityButton onClick={() => {handleQuantityRemove(index)}}><RemoveIcon /></QuantityButton>
                        <QuantityButton onClick={() => {handleQuantityRemoveAll(index)}}><ClearIcon /></QuantityButton>
                      </Quantity>
                    </AddContent>
                  ))
                }
                </AddArrayBox>
              : null}
            </Grid>
            
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
            
          </Grid>

          <AddTotal>
            합계 {billForm.total.toLocaleString()}원
          </AddTotal>
          <AddTotalPerPerson>
            1인 {(billForm.total / billForm.people).toLocaleString()}원
          </AddTotalPerPerson>

          <StyledAddButtonBig onClick={submitForm}>
            추가하기
          </StyledAddButtonBig>

        </StyledBox>
      </StylesProvider>
    </Container>
  )
}

export default Add;