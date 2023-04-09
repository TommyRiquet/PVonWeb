import { useEffect, useState } from 'react'

import { User } from 'services/users.services'

import { useUserAPI } from 'services/users.services'


const useCurrentUser = () => {
	const { getCurrentUser } = useUserAPI()

	const [userProfile, setUserProfile] = useState<User>()

	useEffect(() => {
		getCurrentUser().then(res => setUserProfile(res))
	}, [])

	return {
		userProfile
	}
}

export default useCurrentUser
