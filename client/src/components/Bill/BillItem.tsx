import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CopyToClipboard from 'react-copy-to-clipboard';
import { StyledBox, BillTitle, BillSubTitle, Debtor, PeopleRemained, BillDate, StyledDivider, BoxContent, BillAttribute, MenuName, Quantity, IsPaid, Total, TotalPerPerson, BillButton } from '../styled';

interface BillItemProps {
  companyInfo: Company;
  bill: Bill;
  handlePaid: (id: string, isPaid: number) => void;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (id: string, representative: string, date: string) => void;
  handleCopy: (representative: string, date: string) => void;
}

const BillItem: React.SFC<BillItemProps> = ({ companyInfo, bill, handlePaid, handleEdit, handleDelete, handleCopy }) => {
  const DateStr = `${bill.date.substring(0, 4)}년 ${bill.date.substring(4, 6)}월 ${bill.date.substring(6, 8)}일`;

  const message = (date: string) => {  
    return (
      `안녕하세요. ${companyInfo.name}을 방문해주셔서 감사합니다. \n${date} 발생한 외상거래의 상세내역입니다. \n\n[인원] ${bill.people}명 \n[주문] ${bill.order.map((item) => (item.name + "(" + item.quantity + ")"))} \n[서비스] ${bill.service.map((item) => (item.name))} \n[총합] ${bill.total.toLocaleString()}원 (1인 ${(bill.total/bill.people).toLocaleString()}원) \n\n[주소] ${companyInfo.location} \n[문의] ${companyInfo.phone}`
    )
  }

  return (
    <Grid item md={4} sm={6} xs={12}>
      <StyledBox>
        <BillTitle>
          <Debtor>{bill.representative}님</Debtor>
        </BillTitle>

        <BillSubTitle>
          <PeopleRemained>포함 {bill.people}명</PeopleRemained>
          <BillDate>{DateStr}</BillDate>
        </BillSubTitle>

        <StyledDivider />

        <BoxContent>
          <BillAttribute>
            주문
          </BillAttribute>
        </BoxContent>

        {
          bill.order.map((item) => (
            <BoxContent>
              <MenuName>
                {item.name}
              </MenuName>
              <Quantity>
                {item.quantity}
              </Quantity>
            </BoxContent>
          ))
        }

        <BoxContent>
          <BillAttribute>
            서비스
          </BillAttribute>
        </BoxContent>

        {
          bill.service.map((item) => (
            <BoxContent>
              <MenuName>
                {item.name}
              </MenuName>
            </BoxContent>
          ))
        }
        {bill.memo ? 
          <div>
          <BoxContent>
            <BillAttribute>
              메모
            </BillAttribute>
          </BoxContent>
          <BoxContent>
            {bill.memo}
          </BoxContent>
          </div>
        : null}
        
        <StyledDivider />

        <BoxContent>
          <IsPaid isPaid={bill.isPaid}>
            {bill.isPaid ? "계산됨" : "계산되지 않음"}
          </IsPaid>
          <Total>
            {bill.total.toLocaleString()}원
          </Total>
        </BoxContent>

        <BillSubTitle>
          <TotalPerPerson>
            1인 {(bill.total / bill.people).toLocaleString()}원
          </TotalPerPerson>
        </BillSubTitle>
        
        <StyledDivider />

        <Grid container spacing={1}>
          <Grid item xs={3} md={6}>
            <BillButton onClick={() => handlePaid(bill._id, bill.isPaid)}>
              {bill.isPaid ? "취소" : "완료"}
            </BillButton>
          </Grid>
          <Grid item xs={3} md={6}>
            <BillButton onClick={handleEdit}>수정</BillButton>
          </Grid>
          <Grid item xs={3} md={6}>
            <BillButton onClick={() => handleDelete(bill._id, bill.representative, DateStr)}>삭제</BillButton>
          </Grid>
          <Grid item xs={3} md={6}>
            <CopyToClipboard text={message(DateStr)}>
              <BillButton onClick={() => handleCopy(bill.representative, DateStr)}>복사</BillButton>
            </CopyToClipboard>
          </Grid>
        </Grid>
        
      </StyledBox>
    </Grid>
  )
}

export default BillItem;