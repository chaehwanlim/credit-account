import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './components/GlobalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from './modules';
import { lightMode, darkMode } from './modules/globalTheme';
import Appbar from './components/Appbar';
import Home from './components/Home';
import Footer from './components/Footer';


const App: React.FC = () => {
  const globalThemeMode: string = useSelector((state: StoreState) => state.globalTheme.mode);

  const dispatch = useDispatch();

  const _lightMode = () => {
    dispatch(lightMode());
  }

  const _darkMode = () => {
    dispatch(darkMode());
  }

  return (
    <ThemeProvider theme={globalThemeMode === 'lightMode' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Appbar 
          globalThemeMode={globalThemeMode}
          lightMode={_lightMode}
          darkMode={_darkMode}
        />
        <BrowserRouter>
          <Route path="/" component={Home} />
        </BrowserRouter>
        <Footer />
      </>
    </ThemeProvider>
  )
}

export default App;