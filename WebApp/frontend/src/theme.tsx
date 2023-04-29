import { createTheme } from '@mui/material/styles'

export const openDrawerWidth = 300

export const closedDrawerWidth = 50

const theme = createTheme({
	typography: {
		fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'
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
		},
		background: {
			default: '#f3f3f3'
		}
	}
})

export default theme
