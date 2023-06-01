import { ReactNode, createContext, useContext, useMemo } from 'react'

import useCurrentUser from 'hooks/useCurrentUser'
import useCurrentEnv from 'hooks/useCurrentEnv'

import { Environment } from 'services/environment.services'
import { User } from 'services/users.services'


export interface AppContextType {
	isLoading: boolean
	isError: boolean
	error: any
	isAppReady: boolean
	noEnvironments: boolean
	selectedEnvironment: Environment | null
	listEnvironment: Environment[]
	userProfile: User | null
	currentRole: string
	changeSelectedEnvironment: (environment: Environment) => void
}


const AppContext = createContext<AppContextType>(null!)


export function AppContextProvider({ children }: { children: ReactNode }) {

	const { userProfile } = useCurrentUser()

	const { isLoading, isError, error, listEnvironment, selectedEnvironment, changeSelectedEnvironment, noEnvironments } = useCurrentEnv()

	const isAppReady = useMemo(() => {
		return (!!selectedEnvironment || noEnvironments ) && !!userProfile
	}, [selectedEnvironment, listEnvironment, userProfile])

	const currentRole = useMemo(() => {
		if (userProfile) {
			const currentEnv = (userProfile as any).userEnvironments.find((env: any) => env.environmentId === selectedEnvironment?.id)
			return currentEnv?.role
		}
		return 'user'
	}, [userProfile, selectedEnvironment])

	const value: AppContextType = {
		isLoading,
		isError,
		error,
		isAppReady,
		noEnvironments,
		selectedEnvironment,
		listEnvironment,
		userProfile,
		currentRole,
		changeSelectedEnvironment
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}


export function useAppContext() {
	return useContext(AppContext)
}
