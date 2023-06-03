import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { TabsBox } from 'components/common'

import TeamMembersListView from './TeamMembersListView'

const TeamView: React.FC = () => {

	const { t } = useTranslation()

	const TabDataList = useMemo(() => [
		{label: t('Members'), content: <TeamMembersListView/>, tab: 'members'}
	], [])

	return (
		<Box display='flex' flexDirection='column' width='100%' padding={2}>
			<Typography variant='h4' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>{t('Team')}</Typography>
			<TabsBox tabDataList={TabDataList}/>
		</Box>
	)
}

export default TeamView
