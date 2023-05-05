import { useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import { TabsBox } from 'components/common'
import GeneralSettingsView from './GeneralSettings/GeneralSettingsView'

const SettingsView: React.FC = () => {

	const TabDataList = useMemo(() => [
		{label: 'General', content: <GeneralSettingsView/>, tab: 'general'},
		{label: 'Automatisation', content: <Box>Automatisation</Box>, tab: 'automatisation'},
		{label: 'Notifications', content: <Box>Notifications</Box>, tab: 'notifications'},
		{label: 'Privacy', content: <Box>Privacy</Box>, tab: 'privacy'},
		{label: 'Logs', content: <Box>Logs</Box>, tab: 'logs'}
	], [])

	return (
		<Box display='flex' flexDirection='column' width='100%' padding={2}>
			<Typography variant='h4' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>Settings</Typography>
			<TabsBox tabDataList={TabDataList}/>
		</Box>
	)
}

export default SettingsView
