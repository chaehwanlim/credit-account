import React from 'react';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 400;
  color: grey;
  background: transparent;

  clear: both;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 4rem;
  margin: 4rem 0rem 10rem 0rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`

const Footer: React.FC = () => (
  <StyledFooter>
    <p>Copyright © 2020 CreditAccount</p>
    <StyledLink 
      href="https://github.com/chaehwanlim/credit-account" 
      target="_blank" 
      rel="noopener noreferrer"
      color="inherit"
    >
      GitHub
    </StyledLink>
    &nbsp;|&nbsp;
    <StyledLink 
      href="mailto: chlim428@gmail.com"
      color="inherit"
    >
      chlim428@gmail.com
    </StyledLink>
  </StyledFooter>
)

export default Footer;