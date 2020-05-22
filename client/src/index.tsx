import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
/* import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';
//redux persist : state 유지
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'; */

const MuiTheme = createMuiTheme({
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Inter", "Spoqa Han Sans", "Roboto", "Helvetica Neue", sans-serif',
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      contrastText: '#000000',
    },
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={MuiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app')
);