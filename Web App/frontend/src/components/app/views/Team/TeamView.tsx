import { useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import { TabsBox } from 'components/common'


const TeamView: React.FC = () => {

	const TabDataList = useMemo(() => [
		{label: 'Members', content: <Box>Team</Box>, tab: 'members'},
		{label: 'Roles', content: <Box>Roles</Box>, tab: 'roles'}
	], [])

	return (
		<Box display='flex' flexDirection='column' width='100%'>
			<Typography variant='h4'>Team</Typography>
			<TabsBox tabDataList={TabDataList}/>
		</Box>
	)
}

export default TeamView
