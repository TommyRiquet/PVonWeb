import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		fontFamily: [
			'-apple-system',
			'poppins',
			'BlinkMacSystemFont',
			'Roboto'
		].join(',')
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