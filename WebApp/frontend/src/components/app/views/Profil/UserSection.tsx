import { Box } from '@mui/material'

import ProfileSection from './ProfilSection'
import ChangePasswordSection from './ChangePasswordSection'

const UserSection = () => {
	return (
		<>
			<Box>
				<ProfileSection />
			</Box>
			<Box paddingTop={2}>
				<ChangePasswordSection />
			</Box>
		</>
	)
}

export default UserSection
