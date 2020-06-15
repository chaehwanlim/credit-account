import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { PageTitle, PageSubtitle, StyledBox, BoxTitle, BoxHeader, BoxSubheader, BoxContent, StyledButton, StyledSnackbar, StyledModal, ModalBox, SearchBar, StyledFab, StyledIconButton } from '../styled';
import LinearProgress from '@material-ui/core/LinearProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/AddRounded';
import ClearIcon from '@material-ui/icons/ClearRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import BillItem from './BillItem';
import Axios from 'axios';

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

  if (!sessionStorage.getItem('companyID')) {
    location.assign('/login');
  }
  
  useEffect(() => {
    document.title = "외상장부 - 계산서";
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

  const handleEdit = (id: string) => {
    location.assign(`/bill/editor/${id}`);
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
    const filteredBills = bills.filter((bill: Bill) => (
      (bill.representative.includes(keyword)) ||
      (bill.memo.includes(keyword))
    ));

    return (
      filteredBills.map((bill, index) => (
        <BillItem key={index}
          companyInfo={companyInfo}
          bill={bill}
          handlePaid={handlePaid}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleCopy={handleCopy}
        />
      ))
    )
  }

  const RenderNoBills: React.FC = () => (
    <Grid item xs={12}>
      <StyledBox>
        <BoxTitle>
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

  if (!companyInfo || bills.length === 0 ) {
    return <LinearProgress />
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>

        <PageTitle>계산서</PageTitle>
        <PageSubtitle>{companyInfo.name}</PageSubtitle>

        <Grid container spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <StyledBox>
              <BoxHeader>
                미수금
                <BoxSubheader>
                  {calculateTotal().toLocaleString()}원
                </BoxSubheader>
              </BoxHeader>
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

        <StyledFab onClick={() => location.assign('/bill/new')}>
          <AddIcon />
        </StyledFab>

      </StylesProvider>
    </Container>
  )
}

export default Bill;