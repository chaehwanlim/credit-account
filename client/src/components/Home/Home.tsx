import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import HomeTransaction from './HomeTransaction';

const Title = styled.div`
  margin-top: 3rem;
  font-size: 5rem;
  font-weight: 700;
`;

const Company = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
  color: grey;
`;

const Home: React.FC = () => {
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    const company = sessionStorage.getItem('company');

    if (company) {
      //privateHome 반환
    }

  }, []);

  return (
    <Container maxWidth="md">
      <Title>외상장부</Title>
      <Company>화끈불끈</Company>
      <HomeContentTitle>거래</HomeContentTitle>
      <HomeTransaction />
      <HomeContentTitle>기업 정보</HomeContentTitle>
      
    </Container>
  )
}

export default Home;