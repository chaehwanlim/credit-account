import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './components/GlobalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from './modules';
import { lightMode, darkMode } from './modules/globalTheme';
import Appbar from './components/Appbar/Appbar';
import Home from './components/Home/Home';
import Bill from './components/Bill/Bill';
import BillRouter from './components/Bill/BillRouter';
import Edit from './components/Edit/Edit';
import EditRouter from './components/Edit/EditRouter';
import Add from './components/Edit/Edit';
import Company from './components/Company/Company';
import Login from './components/Account/Login';
import Footer from './components/Footer';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiTheme, MuiThemeDark } from './MuiStyles';


const App: React.FC = () => {
  const globalThemeMode: string = useSelector((state: StoreState) => state.globalTheme.mode);

  const dispatch = useDispatch();

  const _lightMode = () => {
    dispatch(lightMode());
  }

  const _darkMode = () => {
    dispatch(darkMode());
  }

  if(!globalThemeMode)
    return <div></div>

  return (
    <ThemeProvider theme={globalThemeMode === 'lightMode' ? lightTheme : darkTheme}>
      <MuiThemeProvider theme={globalThemeMode === 'lightMode' ? MuiTheme : MuiThemeDark }>

        <GlobalStyles />

        <Appbar 
          globalThemeMode={globalThemeMode}
          lightMode={_lightMode}
          darkMode={_darkMode}
        />

        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/bill" component={BillRouter} />
          <Route path="/company" component={Company} />
          <Route path="/login" component={Login} />
        </BrowserRouter>

        <Footer />

      </MuiThemeProvider>
    </ThemeProvider>
  )
}

export default App;