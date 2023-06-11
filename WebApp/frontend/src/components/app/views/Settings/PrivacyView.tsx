import { Box, Typography } from '@mui/material'

import { PrivacyPolicy } from 'components/common'

const PrivacyView: React.FC = () => {

	return (
		<Box display='flex' flexDirection='column' width='100%' maxHeight='100vh'>
			<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>Privacy Policy</Typography>
			<PrivacyPolicy/>
		</Box>
	)
}

export default PrivacyView
