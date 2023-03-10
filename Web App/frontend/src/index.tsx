// Description: This file is the entry point of the application

// Import React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

// Import Components
import App from './components/App'
import reportWebVitals from './controllers/reportWebVitals'
import theme from './theme'
import { AuthContextProvider } from 'contexts/AuthContext'

// Import Styles
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<AuthContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthContextProvider>
		</ThemeProvider>
	</React.StrictMode>
)

reportWebVitals()
