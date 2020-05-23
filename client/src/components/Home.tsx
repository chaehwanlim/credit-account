import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

const Title = styled.div`
  margin-top: 2rem;
  font-size: 4rem;
  font-weight: 700;
`;

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Title>외상 장부</Title>
    </Container>
  )
}

export default Home;