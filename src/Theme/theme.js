import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // Primary color of blue
    primary: {
      // light: '#63a4ff',
      // main: '#1976d2',
      // dark: '#004ba0',
      light: '#f58025',
      main: '#f58025',
      dark: '#f58025',
      contrastText: '#fff',
    },

    // Secondary color of orange
    secondary: {
      light: '#ffbd45',
      main: '#fb8c00',
      dark: '#c25e00',
      contrastText: '#000',
    },

    background: {
      default: '#bdbdbd',
      paper: '#fff'
    },

    common: {
      gray: '#9E9E9E'
    }
  },
  typography: {
    fontFamily: 'Roboto',
  }
});


export default theme;