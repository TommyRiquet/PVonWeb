// Description: This is the main component of the application. It is the parent of all other components.

// Import Components
import { Routes, Route } from 'react-router-dom'

import { RequireAuth, RequireNotAuth } from 'contexts/AuthContext'
import { AppContextProvider } from 'contexts/AppContext'

import { AppRoutes } from './Routes'
import LoginScreen from './auth/Login/LoginScreen'
import SignIn from './auth/SignIn/SignInScreen'
import Main from './app/views/Main'

function App() {

	return (
		<>
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
		</>
	)
}

export default App
