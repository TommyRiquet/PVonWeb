import React from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'

import App from './components/App'

import { AuthContextProvider } from 'contexts/AuthContext'
import { GlobalContextProvider } from 'contexts/GlobalContext'

import reportWebVitals from './controllers/reportWebVitals'

import theme from './theme'

import './i18n'
import './index.css'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<GlobalContextProvider>
				<CssBaseline />
				<AuthContextProvider>
					<QueryClientProvider client={queryClient}>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</QueryClientProvider>
				</AuthContextProvider>
			</GlobalContextProvider>
		</ThemeProvider>
	</React.StrictMode>
)

reportWebVitals()
