import React from 'react';
import Container from '@material-ui/core/Container';

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <div style={{marginTop: '6rem', fontSize: '4rem', fontWeight: 700}}>
        (외상 장부) <br/>
        (ABCDEFGHIJKLMNOPQRSTUVWXYZ) <br/>
        abcdefghijklmnopqrstuvwxyz <br/>
        0123456789 <br/>
        ~!@#$%^&*()
      </div>
    </Container>
  )
}

export default Home;