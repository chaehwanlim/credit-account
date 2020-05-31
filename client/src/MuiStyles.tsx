import { createMuiTheme } from '@material-ui/core/styles';

export const MuiTheme = createMuiTheme({
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Inter", "Spoqa Han Sans", "Roboto", "Helvetica Neue", sans-serif',
  },
  palette: {

    primary: {
      main: '#2176FF',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  overrides: {
    MuiInputBase: {
      input: {
        fontSize: '1.8rem',
      }
    },
    MuiInputLabel: {
      root: {
        fontSize: '1.8rem'
      }
    },
    MuiTypography: {
      body1: {
        fontSize: '1.7rem',
      },
      body2: {
        fontSize: '1.4rem',
      },
      caption: {
        fontSize: '1.4rem',
      }
    },
    MuiSvgIcon: {
      root: {
        width: '2rem',
        height: '2rem'
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: '1.8rem'
      }
    },
    MuiSelect: {
      selectMenu: {
        display: 'flex',
        alignItems: 'center',
        minWidth: '5rem',
      }
    },
    MuiListSubheader: {
      root: {
        fontSize: '1.5rem',
        fontWeight: 500
      }
    }
  }
});

export const MuiThemeDark = createMuiTheme({
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Inter", "Spoqa Han Sans", "Roboto", "Helvetica Neue", sans-serif',
  },
  palette: {
    type: 'dark',

    background: {
      paper: '#2C2C34',
    },
    primary: {
      main: '#BBBBBB',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  overrides: {
    MuiInputBase: {
      input: {
        fontSize: '1.8rem',
      }
    },
    MuiInputLabel: {
      root: {
        fontSize: '1.8rem'
      }
    },
    MuiTypography: {
      body1: {
        fontSize: '1.7rem',
      },
      body2: {
        fontSize: '1.4rem',
      },
      caption: {
        fontSize: '1.4rem',
      }
    },
    MuiSvgIcon: {
      root: {
        width: '2rem',
        height: '2rem'
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: '1.8rem',
        fontWeight: 500
      }
    },
    MuiSelect: {
      selectMenu: {
        display: 'flex',
        alignItems: 'center',
        minWidth: '5rem',
      }
    },
    MuiListSubheader: {
      root: {
        fontSize: '1.5rem',
        fontWeight: 500
      }
    },
    MuiButton: {
      
    }
  }
});
