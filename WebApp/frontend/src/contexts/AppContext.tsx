import React from 'react'


export interface AppContextType {
	null: null
}


const AppContext = React.createContext<AppContextType>(null!)


export function AppContextProvider({ children }: { children: React.ReactNode }) {

	const value: AppContextType = {
		null: null
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}


export function useAppContext() {
	return React.useContext(AppContext)
}
