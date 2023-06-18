import { Box } from '@mui/material'

import ProfileSection from './ProfilSection'
import ChangePasswordSection from './ChangePasswordSection'

const UserSection = () => {
	return (
		<Box>
			<Box>
				<ProfileSection />
			</Box>
			<Box paddingTop={2}>
				<ChangePasswordSection />
			</Box>
		</Box>
	)
}

export default UserSection
