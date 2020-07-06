import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './components/GlobalStyles';

import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from './modules';
import { lightMode, darkMode } from './modules/globalTheme';
import { setTitle } from './modules/title';

import Appbar from './components/Appbar/Appbar';
import Home from './components/Home/Home';
import BillRouter from './components/Bill/BillRouter';
import Company from './components/Company/Company';
import Login from './components/Account/Login';
import Footer from './components/Footer';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { MuiTheme, MuiThemeDark } from './MuiStyles';


const App: React.FC = () => {
  const globalThemeMode: string = useSelector((state: StoreState) => state.globalTheme.mode);
  const title: string = useSelector((state: StoreState) => state.titleState.title);

  const dispatch = useDispatch();

  const _lightMode = () => {
    dispatch(lightMode());
  }

  const _darkMode = () => {
    dispatch(darkMode());
  }

  const _setTitle = (title: string) => {
    dispatch(setTitle(title));
  }

  if(!globalThemeMode)
    return <div></div>

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={globalThemeMode === 'lightMode' ? lightTheme : darkTheme}>
        <MuiThemeProvider
          theme={globalThemeMode === 'lightMode' ? MuiTheme : MuiThemeDark }
        >

          <GlobalStyles />

          <BrowserRouter>
            <Appbar 
              globalThemeMode={globalThemeMode}
              lightMode={_lightMode}
              darkMode={_darkMode}
              title={title}
            />
            <Route exact path="/" render={() => <Home setTitle={_setTitle} />} />
            <Route path="/bill" component={BillRouter} />
            <Route path="/company" render={() => <Company setTitle={_setTitle} />} />
            <Route path="/login" render={() => <Login setTitle={_setTitle} />} />
          </BrowserRouter>

          <Footer />

        </MuiThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App;