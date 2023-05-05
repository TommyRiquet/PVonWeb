import { Box, Stack } from '@mui/material'

import GeneralEnvironmentSettings from './GeneralEnvironmentSettings'

import { useGlobalContext } from 'contexts/GlobalContext'

const GeneralSettingsView: React.FC = () => {
	const { isMobile } = useGlobalContext()

	return (
		<Box display='flex' flexDirection='column' width='100%'>
			<Stack alignItems='start' spacing={3} sx={{width: isMobile ? '100%' : '35%'}}>
				<GeneralEnvironmentSettings/>
			</Stack>
		</Box>
	)
}

export default GeneralSettingsView
