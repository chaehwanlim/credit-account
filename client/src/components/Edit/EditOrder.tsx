import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddIcon from '@material-ui/icons/AddRounded';
import RemoveIcon from '@material-ui/icons/RemoveRounded';
import ClearIcon from '@material-ui/icons/ClearRounded';
import { BoxTitle, BoxContent, ArrayBox, StyledIconButton } from '../styled';

interface EditOrderProps {
  menuDisplay: { 
    drink: { name: string, price: number }[], 
    food: { name: string, price: number }[] 
  };
  billForm: Form;
  calculateTotal: () => void;
  setBillForm: (value: React.SetStateAction<Form>) => void;
}

const EditOrder: React.FC<EditOrderProps> = ({ menuDisplay, billForm, calculateTotal, setBillForm }) => {
  const [selectedOrder, setSelectedOrder] = useState<string>("메뉴를 선택해주세요.");

  const handleOrder = (e: React.ChangeEvent<{ value: string }>) => {
    if (e.target.value === null) {
      return;
    }
    setSelectedOrder(e.target.value);
  }

  const OrderSelection: React.FC = () => (
    <Select 
      defaultValue="" 
      id="grouped-select"
      value={selectedOrder}
      onChange={handleOrder}
      fullWidth
      type="number"
    >
      <MenuItem value="메뉴를 선택해주세요.">
        메뉴를 선택해주세요.
      </MenuItem>
      
      <ListSubheader>
        음식
      </ListSubheader>
      {
        menuDisplay.food.map((item, index) => (
        <MenuItem value={item.name} key={index}>{item.name} · {item.price.toLocaleString()}원</MenuItem>
        ))
      }
      <ListSubheader>
        음료
      </ListSubheader>
      {
        menuDisplay.drink.map((item, index) => (
        <MenuItem value={item.name} key={index}>{item.name} · {item.price.toLocaleString()}원</MenuItem>
        ))
      }
    </Select>
  )

  const handleOrderAdd = () => {
    let orderExists: boolean = false;

    if(selectedOrder === "")
      setSelectedOrder('메뉴를 선택해주세요.');

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

  return (
    <Grid item xs={12} sm={6}>
      <BoxTitle stickTop>
        주문
      </BoxTitle>
      <BoxContent stickTop>
        <OrderSelection />
        <StyledIconButton wide onClick={handleOrderAdd}>
          <AddIcon />
        </StyledIconButton>
      </BoxContent>

      {billForm.order.length !== 0 ? 
      <ArrayBox>
        {billForm.order.map((item, index) => (
          <BoxContent stickTop key={index}>
            {item.name} &nbsp;·&nbsp; {item.quantity}
            <div>
              <StyledIconButton onClick={() => {handleQuantityAdd(index)}}>
                <AddIcon />
              </StyledIconButton>
              <StyledIconButton onClick={() => {handleQuantityRemove(index)}}>
                <RemoveIcon />
              </StyledIconButton>
              <StyledIconButton onClick={() => {handleQuantityRemoveAll(index)}}>
                <ClearIcon />
              </StyledIconButton>
            </div>
          </BoxContent>
        ))}
      </ArrayBox>
      : null}
    </Grid>
  )
}

export default EditOrder;