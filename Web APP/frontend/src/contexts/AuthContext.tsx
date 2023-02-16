import React from 'react'

import axios from 'axios'
import config from '../config.json'


interface AuthContextType {
    login: (email: string, password: string, onSuccess: (res: any) => any, onError: (err: any) => any) => void
    logout: (onSuccess: (res: any) => any, onError: (err: any) => any) => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {

	const login = (email: string, password: string, onSuccess: (res: any) => any, onError: (err: any) => any) => {
		axios.post<{ key: string }>(
			config.API_URL + 'auth/login',
			{
				email: email,
				password: password
			}
		).then((res) => {
			onSuccess(res)
		}).catch((err) => {
			onError(err)
		})
	}

	const logout = (onSuccess: (res: any) => any, onError: (err: any) => any) => {
		axios.post<{ key: string }>(
			config.API_URL + 'auth/logout'
		).then((res) => {
			onSuccess(res)
		}).catch((err) => {
			onError(err)
		})
	}

	const value = { login, logout }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	return React.useContext(AuthContext)
}