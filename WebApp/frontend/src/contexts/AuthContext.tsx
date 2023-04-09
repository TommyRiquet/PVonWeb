import React, { useState } from 'react'

import { useLocation, Navigate } from 'react-router-dom'

import config from 'config.json'


interface AuthContextType {
	authenticated: boolean
	token: string
    login: (email: string, password: string, onSuccess: (res: any) => any, onError: (err: any) => any) => void
    logout: () => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [ token, setToken ] = useState<any>(() => {
		const tokenLocalStorage = localStorage.getItem('token')
		return tokenLocalStorage || ''
	})
	const [authenticated, setAuthenticated] = useState(token !== '')


	const login = (email: string, password: string, onSuccess: (res: any) => any, onError: (err: any) => any) => {
		fetch(config.API_URL + 'auth/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((res) => {
					setToken(res.token)
					localStorage.setItem('token', res.token)
					setAuthenticated(true)
					onSuccess(res)
				})
			} else {
				onError(res)
			}
		})
	}

	const logout = () => {
		setToken('')
		localStorage.removeItem('token')
		setAuthenticated(false)
	}


	const value = { authenticated, token, login, logout }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	return React.useContext(AuthContext)
}

export function RequireAuth({ children }: { children: JSX.Element }) {
	const auth = useAuth()
	const location = useLocation()

	if (!auth.authenticated) {
		return <Navigate to='/login' state={{ from: location }} replace />
	}

	if (location.pathname === '/') {
		return <Navigate to='/dashboard' replace />
	}

	return children
}

export function RequireNotAuth({ children }: { children: JSX.Element }) {
	const auth = useAuth()
	const location = useLocation()

	if (auth.authenticated) {
		return <Navigate to='/dashboard' state={{ from: location }} replace />
	}

	return children
}
