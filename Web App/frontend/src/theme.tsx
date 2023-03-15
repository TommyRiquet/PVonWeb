import { createTheme } from '@mui/material/styles'

import Poppins from './static/fonts/Poppins-Regular.ttf'

export const openDrawerWidth = 300

export const closedDrawerWidth = 50

const theme = createTheme({
	typography: {
		fontFamily: 'Poppins, Arial',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			@font-face {
			  font-family: 'Poppins';
			  font-style: normal;
			  font-display: swap;
			  font-weight: 400;
			  src: local('Poppins'), local('Poppins-Regular'), url(${Poppins}) format('ttf');
			  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
			}
		  `,
		},
	},
	palette: {
		primary: {
			light: '#5EC57E',
			main: '#449342',
			dark: '#347571',
			contrastText: '#fdfdfd'
		},
		secondary: {
			light: '#FFFFFF',
			main: '#FFFFFF',
			dark: '#FFFFFF',
			contrastText: '#2f2f2f'
		}
	}
})

export default theme
