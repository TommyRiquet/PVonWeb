import { useEffect, useState } from 'react'

import useStorage from './useStorage'
import { Environment, useEnvironmentAPI } from 'services/environment.services'
import { useQuery } from 'react-query'


const useCurrentEnv = () => {

	const { getEnvironments } = useEnvironmentAPI()
	const { getStorageItem, setStorageItem } = useStorage()

	const [ listEnvironment, setListEnvironment ] = useState<Environment[]>([])
	const [ selectedEnvironment, setSelectedEnvironment ] = useState<Environment | null>(null)

	const handleSelectedEnvironment = (data: any) => {
		setListEnvironment(data)
		if (data.length > 0) {
			const selectedEnvironmentId = getStorageItem('selectedEnvironmentId')
			if (selectedEnvironmentId) {
				const selectedEnvironment = data.find((environment: Environment) => environment.id === selectedEnvironmentId)
				if (selectedEnvironment) {
					setSelectedEnvironment(selectedEnvironment)
				}else{
					setSelectedEnvironment(data[0])
					setStorageItem('selectedEnvironmentId', data[0].id)
				}
			}else{
				setSelectedEnvironment(data[0])
				setStorageItem('selectedEnvironmentId', data[0].id)
			}
		}
	}

	const { isLoading, isError, error } = useQuery(['environments'], () => getEnvironments(), {
		onSuccess: (data) => handleSelectedEnvironment(data)
	})

	useEffect(() => {
		const selectedEnvironmentId = getStorageItem('selectedEnvironmentId')
		if (selectedEnvironmentId) {
			const selectedEnvironment = listEnvironment.find(environment => environment.id === selectedEnvironmentId)
			if (selectedEnvironment) {
				setSelectedEnvironment(selectedEnvironment)
			}
		}else{
			setSelectedEnvironment(listEnvironment[0])
		}
	}, [listEnvironment])


	const changeSelectedEnvironment = (environment: Environment) => {
		setSelectedEnvironment(environment)
		setStorageItem('selectedEnvironmentId', environment.id)
	}


	return {
		isLoading,
		isError,
		error,
		selectedEnvironment,
		listEnvironment,
		changeSelectedEnvironment
	}
}

export default useCurrentEnv
