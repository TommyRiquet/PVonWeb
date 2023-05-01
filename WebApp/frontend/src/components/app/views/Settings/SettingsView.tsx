import { useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import { TabsBox } from 'components/common'


const SettingsView: React.FC = () => {

	const TabDataList = useMemo(() => [
		{label: 'Generale', content: <Box>Generale</Box>, tab: 'generale'},
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
