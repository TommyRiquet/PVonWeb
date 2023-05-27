import { Box, Stack } from '@mui/material'

import GeneralEnvironmentSettings from './GeneralEnvironmentSettings'
import LanguageSelectSettings from './LanguageSelectSettings'

import { useGlobalContext } from 'contexts/GlobalContext'

const GeneralSettingsView: React.FC = () => {
	const { isMobile } = useGlobalContext()

	return (
		<Box display='flex' flexDirection='column' width='100%'>
			<Stack alignItems='start' sx={{width: isMobile ? '100%' : '35%', paddingTop: 3}}>
				<GeneralEnvironmentSettings/>
				<LanguageSelectSettings/>
			</Stack>
		</Box>
	)
}

export default GeneralSettingsView
