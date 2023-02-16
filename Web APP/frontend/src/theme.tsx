import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#51b34f',
      main: '#449342',
      dark: '#387a36',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFFFFF',
      main: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#000',
    },
  },
});

export default theme;