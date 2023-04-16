import { ReactNode, useContext, createContext, useState, useEffect } from 'react'

import { useLocation, Navigate } from 'react-router-dom'

import config from 'config.json'


interface AuthContextType {
	token: string
    login: (email: string, password: string, onSuccess: (res: any) => any, onError: (err: any) => any) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthContextProvider({ children }: { children: ReactNode }) {

	const [token, setToken] = useState<string>(localStorage.getItem('token') || '')

	useEffect(() => {
		if (token) {
			fetch(config.API_URL + 'auth/verify', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					token: token
				})
			}).then((res) => {
				if (res.status !== 200) {
					setToken('')
					localStorage.removeItem('token')
				}
			})
		}
	}, [token])


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
	}


	const value = { token, login, logout }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	return useContext(AuthContext)
}

export function RequireAuth({ children }: { children: JSX.Element }) {
	const { token } = useAuth()
	const location = useLocation()

	if (!token) {
		return <Navigate to='/login' state={{ from: location }} replace />
	}

	if (location.pathname === '/') {
		return <Navigate to='/dashboard' replace />
	}

	return children
}

export function RequireNotAuth({ children }: { children: JSX.Element }) {
	const { token }  = useAuth()
	const location = useLocation()

	if (token) {
		return <Navigate to='/dashboard' state={{ from: location }} replace />
	}

	return children
}
