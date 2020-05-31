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
import companyFile from '../../../testdata/company';
import billFile from '../../../testdata/bills';
import AddIcon from '@material-ui/icons/AddRounded';
import RemoveIcon from '@material-ui/icons/RemoveRounded';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/ClearRounded';


interface Form {
  date: string;
  people: number;
  representative: string;
  order: { name: string, quantity: number }[];
  service: { name: string }[];
  memo: string;
  total: number;
  isPaid: number;
}

const Add: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [menuArray, setMenuArray] = useState<object[]>([]);
  const [billForm, setBillForm] = useState<Form>({
    date: "",
    people: 1,
    representative: "",
    order: [],
    service: [],
    memo: "",
    total: 0,
    isPaid: 0
  });
  const [selectedOrder, setSelectedOrder] = useState<string>("메뉴를 선택해주세요.");
  const [serviceInput, setServiceInput] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [totalPerPerson, setTotalPerPerson] = useState<number>(0);

  useEffect(() => {
    document.title = "외상장부 - 추가";

    dateToString();

    calculateTotal();
  }, [selectedDate, billForm.people, billForm.representative]);

  const dateToString = () => {
    let dateStr = ""

    dateStr = dateStr.concat(selectedDate.getFullYear().toString());
    
    if (selectedDate.getMonth() + 1 < 10) {
      dateStr = dateStr.concat("0" + (selectedDate.getMonth() + 1).toString());
    } else {
      dateStr = dateStr.concat((selectedDate.getMonth() + 1).toString());
    }

    if (selectedDate.getDate() < 10) {
      dateStr = dateStr.concat("0" + selectedDate.getDate().toString());
    } else {
      dateStr = dateStr.concat(selectedDate.getDate().toString());
    }

    setBillForm({
      ...billForm,
      date: dateStr
    });
  }

  const handleDate = (date: Date | null) => {
    setSelectedDate(date);

    dateToString();
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

  const handleOrder = (e: React.ChangeEvent<{ value: string}>) => setSelectedOrder(e.target.value);

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
        companyFile.menuDisplay.drink.map((item, index) => (
        <MenuItem value={item.name} key={index}>{item.name} · {item.price.toLocaleString()}원</MenuItem>
        ))
      }
      <ListSubheader>
        음식
      </ListSubheader>
      {
        companyFile.menuDisplay.food.map((item, index) => (
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

    billForm.order.map((item) => (total = total + item.quantity * companyFile.price[item.name]));

    setTotal(total);

    setTotalPerPerson(total / billForm.people);
  }

  const handleSubmit = () => {

    console.log(billForm);
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

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>

        <Title>추가</Title>
        <Company>화끈불끈</Company>
        
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
            합계 {total.toLocaleString()}원
          </AddTotal>
          <AddTotalPerPerson>
            1인 {totalPerPerson.toLocaleString()}원
          </AddTotalPerPerson>

          <StyledAddButtonBig onClick={handleSubmit}>
            추가하기
          </StyledAddButtonBig>

        </StyledBox>
      </StylesProvider>
    </Container>
  )
}

export default Add;