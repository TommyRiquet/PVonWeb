import { useEffect, useState } from 'react'

import i18n from 'i18next'

import { User } from 'services/users.services'

import { useUserAPI } from 'services/users.services'
import { useQuery } from 'react-query'


const useCurrentUser = () => {

	const { getCurrentUser, updateUser, changePassword } = useUserAPI()

	const [userProfile, setUserProfile] = useState<User | null>(null)

	useQuery(['userProfile'], () => getCurrentUser(), {
		onSuccess: (res) => {
			updateLanguage(res.language)
			setUserProfile(res)
		}
	})

	const updateLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}

	const updateCurrentUser = (user: any) => {
		return updateUser(user)
			.then(res => {
				if(!res) return false
				setUserProfile(res)
				return true
			})
	}


	return {
		userProfile,
		updateCurrentUser,
		changePassword,
		updateLanguage
	}
}

export default useCurrentUser
