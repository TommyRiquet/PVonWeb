import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'

import { RequireAuth, RequireNotAuth } from 'contexts/AuthContext'
import { AppContextProvider } from 'contexts/AppContext'

import { AppRoutes } from './Routes'
import LoginScreen from './auth/Login/LoginScreen'
import SignIn from './auth/SignIn/SignInScreen'
import Main from './app/views/MainScreen'

function App() {

	return (
		<Box height='100%'>
			<Routes>
				<Route
					path='/login'
					element={<RequireNotAuth><LoginScreen/></RequireNotAuth>}
				/>
				<Route
					path='/signin'
					element={<RequireNotAuth><SignIn/></RequireNotAuth>}
				/>
				<Route path='/'
					element={
						<RequireAuth>
							<AppContextProvider>
								<Main/>
							</AppContextProvider>
						</RequireAuth>
					}
				>
					{
						AppRoutes.map(route => {
							return (
								<Route
									key={route.path}
									path={route.path}
									element={
										route.view
									}
								/>
							)
						})
					}
				</Route>
			</Routes>
		</Box>
	)
}

export default App
