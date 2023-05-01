import { useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import { TabsBox } from 'components/common'

import TeamMembersListView from './TeamMembersListView'
import TeamRolesListView from './TeamRolesListView'

const TeamView: React.FC = () => {

	const TabDataList = useMemo(() => [
		{label: 'Members', content: <TeamMembersListView/>, tab: 'members'},
		{label: 'Roles', content: <TeamRolesListView/>, tab: 'roles'}
	], [])

	return (
		<Box display='flex' flexDirection='column' width='100%' padding={2}>
			<Typography variant='h4' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>Team</Typography>
			<TabsBox tabDataList={TabDataList}/>
		</Box>
	)
}

export default TeamView
