import React, { useState, useEffect } from 'react'

import { useLocation, Navigate } from 'react-router-dom'

import config from 'config.json'


interface AuthContextType {
	authenticated: boolean
	token: string
    login: (email: string, password: string, onSuccess: (res: any) => any, onError: (err: any) => any) => void
    logout: (onSuccess: (res: any) => any, onError: (err: any) => any) => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
	const [authenticated, setAuthenticated] = useState(false)
	const [ token, setToken ] = useState<any>(()=>{
		document.cookie.split(';').forEach((cookie)=>{
			if(cookie.trim().startsWith('token=')){
				setAuthenticated(true)
				return cookie.trim().split('=')[1]
			}
			return ''
		})
	})


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
				setAuthenticated(true)
				onSuccess(res)
			} else {
				onError(res)
			}
		})
	}

	const logout = (onSuccess: (res: any) => any, onError: (err: any) => any) => {
		fetch(config.API_URL + 'auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.status === 200) {
				onSuccess(res)
			} else {
				onError(res)
			}
		})
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
