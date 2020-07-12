import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { PageTitle, PageSubtitle, StyledBox, BoxTitle, BoxHeader, BoxSubheader, BoxContent, StyledButton, StyledSnackbar, StyledModal, ModalBox, SearchBar, StyledFab, StyledIconButton, StyledLink } from '../styled';
import LinearProgress from '@material-ui/core/LinearProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/AddRounded';
import ClearIcon from '@material-ui/icons/ClearRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import BillItem from './BillItem';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const Bill: React.FC<{ setTitle: (title: string) => void }> = ({ setTitle }) => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [copiedBill, setCopiedBill] = useState<{ representative: string, date: string }>({
    representative: '',
    date: ''
  });
  const [billToDelete, setBillToDelete] = useState<{ id: string, representative: string, date: string }>({
    id: '',
    representative: '',
    date: ''
  })
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [filter, setFilter] = useState<number>(2);

  if (!sessionStorage.getItem('companyID')) {
    return <Redirect to="/login" />
  }
  
  useEffect(() => {
    setTitle('계산서');

    Axios({
      method: 'get',
      url: `/api/company/${sessionStorage.getItem('companyID')}`
    })
    .then(res => setCompanyInfo(res.data[0]))
    .then(() => getBills())
    .catch(err => console.log(err));

    getBills();
  }, []);

  const getBills = () => {
    Axios({
      method: 'get',
      url: `/api/bills/company/${sessionStorage.getItem('companyID')}`
    })
    .then(res => setBills(res.data))
    .catch(err => console.log(err));
  }

  const calculateTotal = () => {
    let overallTotal = 0;

    bills.map((bill, index) => {
      if(bill.isPaid === 0) {
        overallTotal = overallTotal + bill.total;
      }
    });

    return overallTotal;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value as string);
  }

  const handlePaid = (id: string, isPaid: number) => {
    Axios({
      method: 'put',
      url: `/api/bills/${id}`,
      data: {
        isPaid: 1-isPaid
      }
    })
    .then((res) => {
      if (res.data.success === 1)
        getBills();
      else if (res.data.fail === 1)
        alert('다시 시도해주세요.');
    })
    .catch(err => console.log(err));
  }

  const handleDelete = (id: string, representative: string, date: string) => {
    setBillToDelete({
      id: id,
      representative: representative,
      date: date
    });

    setModalOpen(true);
  }

  const executeDeletion = (id: string) => {
    Axios({
      method: 'delete',
      url: `/api/bills/${id}`,
      data: {
        isDeleted: 1
      }
    })
    .then((res) => {
      if (res.data.success === 1)
        getBills();
      else if (res.data.fail === 1)
        alert('다시 시도해주세요.');
    })
    .then(() => setModalOpen(false))
    .catch(err => console.log(err));
  }

  const handleCopy = (representative: string, date: string) => {
    setCopiedBill({
      representative: representative,
      date: date
    })
    setAlertOpen(true);
  }

  const RenderBills = () => {
    let filteredBills = bills;

    if (filter === 2) {
      filteredBills = bills.filter((bill: Bill) => (
        (bill.representative.includes(keyword)) ||
        (bill.memo.includes(keyword))
      ));
    } else {
      filteredBills = bills.filter((bill: Bill) => (
        bill.isPaid === filter
      ));

      filteredBills = filteredBills.filter((bill: Bill) => (
        (bill.representative.includes(keyword)) ||
        (bill.memo.includes(keyword))
      ));
    }

    return (
      filteredBills.map((bill, index) => (
        <BillItem key={index}
          companyInfo={companyInfo}
          bill={bill}
          handlePaid={handlePaid}
          handleDelete={handleDelete}
          handleCopy={handleCopy}
        />
      ))
    )
  }

  const RenderNoBills: React.FC = () => (
    <Grid item xs={12}>
      <StyledBox>
        <BoxTitle stickTop>
          외상 거래가 없습니다.
        </BoxTitle>
      </StyledBox>
    </Grid>
  )

  const handleModalClose = () => {
    setModalOpen(false);
  }

  const handleAlertClose = () => {
    setAlertOpen(false);
  }

  const handleFilter = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(e.target.value as number);
  }

  if (!companyInfo) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <PageTitle>계산서</PageTitle>
      <PageSubtitle>{companyInfo.name}</PageSubtitle>

      <Grid container spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item xs={12}>
          <StyledBox>
            <BoxContent stickTop>
              <BoxHeader>
                미수금
                <BoxSubheader>
                  {calculateTotal().toLocaleString()}원
                </BoxSubheader>
              </BoxHeader>

              <Select
                value={filter}
                onChange={handleFilter}
                type="number"
              >
                <MenuItem value={2}>전체</MenuItem>
                <MenuItem value={1}>계산됨</MenuItem>
                <MenuItem value={0}>계산되지 않음</MenuItem>
              </Select>
            </BoxContent>
          </StyledBox>
        </Grid>

        <Grid item xs={12}>
          <SearchBar 
            placeholder="대표자나 메모로 검색하세요."
            value={keyword}
            onChange={handleSearch}
            endAdornment={
              <SearchIcon />
            }
            fullWidth
          />
        </Grid>
      
        {bills.length !== 0 ? RenderBills() : <RenderNoBills />}

      </Grid>

      <StyledSnackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={alertOpen} 
        onClose={handleAlertClose}
        autoHideDuration={5000}
        message={`계산서 복사됨 · ${copiedBill.representative}님 (${copiedBill.date})`} 
        action={
          <React.Fragment>
            <StyledIconButton onClick={handleAlertClose}>
              <ClearIcon />
            </StyledIconButton>
          </React.Fragment>
        }
      />

      <StyledModal
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={modalOpen}>
          <ModalBox>
            <BoxTitle stickTop>
              계산서 · {billToDelete.representative}님 ({billToDelete.date})
            </BoxTitle>
            <BoxContent style={{marginBottom: '2rem'}}>
              정말로 삭제하시겠습니까?
            </BoxContent>
            
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <StyledButton onClick={() => setModalOpen(false)}>
                  취소
                </StyledButton>
              </Grid>
              <Grid item xs={6}>
                <StyledButton style={{color: '#FF4444'}} onClick={() => executeDeletion(billToDelete.id)}>
                  삭제
                </StyledButton>
              </Grid>
            </Grid>
            
          </ModalBox>
        </Fade>
      </StyledModal>

      <StyledLink to="/bill/new">
        <StyledFab>
          <AddIcon />
        </StyledFab>
      </StyledLink>

    </Container>
  )
}

export default Bill;