import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import billFile from '../../../testdata/bills';
import { lightTheme, darkTheme } from '../GlobalStyles';

interface BoxProps {
  darkModeEnabled: boolean;
}

const ContentTitle = styled.div`
  margin-top: 4rem;
  padding-left: 1rem;
  font-size: 2.5rem;
  font-weight: 500;
`;

const StyledBox = styled(Box)<BoxProps>`
  background-color: ${( props ) => props.darkModeEnabled ? darkTheme.elementBg : lightTheme.elementBg};
  border-radius: 1rem;
  padding: 1rem;
`;

const StyledBoxTitle = styled.div`
  font-size: 2rem;
`;

const HomeTransaction: React.FC = () => {
  const [bills, setBills] = useState([]);
  const [themeMode, setThemeMode] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setBills(billFile);
    setThemeMode(window.localStorage.getItem("theme"));

    if(bills)
      totalReceivable()

  }, []);

  const totalReceivable = () => {
    let tempTotal = 0;

    bills.map((bill) => ( tempTotal = tempTotal + bill.total ));

    setTotal(tempTotal);
  }

  return (
    <StyledBox darkModeEnabled={themeMode === "darkMode" ? true : false}
    >
      <StyledBoxTitle>
        총 미수금 {total}
      </StyledBoxTitle>
    </StyledBox>
  )

}

export default HomeTransaction;