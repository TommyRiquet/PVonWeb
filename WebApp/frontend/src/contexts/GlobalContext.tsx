import { createContext, useContext, ReactNode } from 'react'

import useMediaQuery from '@mui/material/useMediaQuery'

import theme from 'theme'


export interface GlobalContextType {
    isMobile: boolean
}


const GlobalContext = createContext<GlobalContextType>(null!)

export function GlobalContextProvider({ children }: { children: ReactNode }) {

	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const value: GlobalContextType = {
		isMobile
	}

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}


export function useGlobalContext() {
	return useContext(GlobalContext)
}
