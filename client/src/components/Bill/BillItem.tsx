import React from 'react';
import Grid from '@material-ui/core/Grid';
import CopyToClipboard from 'react-copy-to-clipboard';
import { StyledBox, BoxTitle, BoxSubtitle, GreyContent, StyledButton, StyledDivider, BoxContent, IsPaid } from '../styled';

interface BillItemProps {
  companyInfo: Company;
  bill: Bill;
  handlePaid: (id: string, isPaid: number) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string, representative: string, date: string) => void;
  handleCopy: (representative: string, date: string) => void;
}

const BillItem: React.FC<BillItemProps> = ({ companyInfo, bill, handlePaid, handleEdit, handleDelete, handleCopy }) => {
  const dateToString = (date: Date | null) => {
    const newDate = new Date(date);
    let dateStr = ""
  
    dateStr = dateStr.concat(newDate.getFullYear().toString() + "년 ");
    
    if (newDate.getMonth() + 1 < 10) {
      dateStr = dateStr.concat("0" + (newDate.getMonth() + 1).toString() + "월 ");
    } else {
      dateStr = dateStr.concat((newDate.getMonth() + 1).toString() + "월 ");
    }
  
    if (newDate.getDate() < 10) {
      dateStr = dateStr.concat("0" + newDate.getDate().toString() + "일");
    } else {
      dateStr = dateStr.concat(newDate.getDate().toString() + "일");
    }
  
    return dateStr;
  }

  const message = () => {  
    return (
      `안녕하세요. ${companyInfo.name}을 방문해주셔서 감사합니다. \n${dateToString(bill.date)} 발생한 외상거래의 상세내역입니다. \n\n[인원] ${bill.people}명 \n[주문] ${bill.order.map((item) => (item.name + "(" + item.quantity + ")"))} \n[서비스] ${bill.service.map((item) => (item.name))} \n[총합] ${bill.total.toLocaleString()}원 (1인 ${(bill.total/bill.people).toLocaleString()}원) \n[계좌] ${companyInfo.account.bank} · ${companyInfo.account.accountName} · ${companyInfo.account.accountNumber} \n\n[사업자등록번호] ${companyInfo.businessNumber} \n[주소] ${companyInfo.location} \n[문의] ${companyInfo.phone}`
    )
  }

  return (
    <Grid item md={4} sm={6} xs={12}>
      <StyledBox>
        <BoxTitle stickTop>
          {bill.representative}님
        </BoxTitle>

        <BoxContent stickTop>
          <BoxSubtitle>인원 {bill.people}명</BoxSubtitle>
          <BoxSubtitle>{dateToString(bill.date)}</BoxSubtitle>
        </BoxContent>

        <StyledDivider />

        <BoxTitle stickTop>
          주문
        </BoxTitle>

        {bill.order.map((item) => (
          <BoxContent marginLeft>
            {item.name}
            <GreyContent>
              {item.quantity}
            </GreyContent>
          </BoxContent>
        ))}

        {bill.service ?
          <BoxTitle>
            서비스
          </BoxTitle>
        : null}

        {bill.service.map((item) => (
          <BoxContent marginLeft>
            {item.name}
          </BoxContent>
        ))}

        {bill.memo ? 
          <div>
          <BoxTitle>
            메모
          </BoxTitle>
          <BoxContent marginLeft>
            {bill.memo}
          </BoxContent>
          </div>
        : null}
        
        <StyledDivider />

        <BoxContent stickTop>
          <IsPaid stickTop isPaid={bill.isPaid}>
            {bill.isPaid ? "계산됨" : "계산되지 않음"}
          </IsPaid>
          <BoxTitle stickTop>
            {bill.total.toLocaleString()}원
          </BoxTitle>
        </BoxContent>

        <BoxSubtitle alignRight>
          1인 {(bill.total / bill.people).toLocaleString()}원
        </BoxSubtitle>
        
        <StyledDivider />

        <Grid container spacing={1}>
          <Grid item xs={3} md={6}>
            <StyledButton onClick={() => handlePaid(bill._id, bill.isPaid)}>
              {bill.isPaid ? "취소" : "완료"}
            </StyledButton>
          </Grid>
          <Grid item xs={3} md={6}>
            <StyledButton onClick={() => handleEdit(bill._id)}>수정</StyledButton>
          </Grid>
          <Grid item xs={3} md={6}>
            <StyledButton onClick={() => handleDelete(bill._id, bill.representative, dateToString(bill.date))}>삭제</StyledButton>
          </Grid>
          <Grid item xs={3} md={6}>
            <CopyToClipboard text={message()}>
              <StyledButton onClick={() => handleCopy(bill.representative, dateToString(bill.date))}>복사</StyledButton>
            </CopyToClipboard>
          </Grid>
        </Grid>
        
      </StyledBox>
    </Grid>
  )
}

export default BillItem;