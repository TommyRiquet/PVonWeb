import { useEffect, useState } from 'react'

import { User } from 'services/users.services'

import { useUserAPI } from 'services/users.services'


const useCurrentUser = () => {
	const { getCurrentUser, updateUser, changePassword } = useUserAPI()

	const [userProfile, setUserProfile] = useState<User>()

	useEffect(() => {
		getCurrentUser().then(res => setUserProfile(res))
	}, [])

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
		changePassword
	}
}

export default useCurrentUser
