import React from 'react'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'

import App from './components/App'

import { AuthContextProvider } from 'contexts/AuthContext'
import { GlobalContextProvider } from 'contexts/GlobalContext'

import reportWebVitals from './controllers/reportWebVitals'

import theme from './theme'

import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<GlobalContextProvider>
				<CssBaseline />
				<AuthContextProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</AuthContextProvider>
			</GlobalContextProvider>
		</ThemeProvider>
	</React.StrictMode>
)

reportWebVitals()
