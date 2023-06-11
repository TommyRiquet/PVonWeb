import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { PrivacyPolicy } from 'components/common'

const PrivacyView: React.FC = () => {

	const { t } = useTranslation()

	return (
		<Box display='flex' flexDirection='column' width='100%' maxHeight='100vh'>
			<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>{t('Privacy Policy')}</Typography>
			<PrivacyPolicy/>
		</Box>
	)
}

export default PrivacyView
