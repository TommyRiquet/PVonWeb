import { FC, useMemo, useState } from 'react'

import { useQuery } from 'react-query'
import { Box, Typography } from '@mui/material'

import { Loading, QueryError } from 'components/common'

import { useStatisticsAPI, Log } from 'services/statistics.services'


const userActions = {
	'create': 'invited',
	'update': 'has edited',
	'delete': 'kicked'
}

const environmentActions = {
	'create': 'created',
	'update': 'has made changes to',
	'delete': 'removed'
}

const transcriptActions = {
	'create': 'created',
	'update': 'has made changes to',
	'delete': 'deleted'
}

const tagActions = {
	'create': 'created tag ',
	'update': 'has made changes to tag ',
	'delete': 'deleted tag '
}


const HistoryItem: FC<Log> = ({user, action, targetUser, targetEnvironment, targetTranscript, targetTag}) => {

	const userAction = useMemo(() => {
		if (targetUser)
			return userActions[action as keyof typeof userActions]
		else if (targetEnvironment)
			return environmentActions[action as keyof typeof environmentActions]
		else if (targetTranscript)
			return transcriptActions[action as keyof typeof transcriptActions]
		else if (targetTag)
			return tagActions[action as keyof typeof tagActions]
	}, [targetUser, targetEnvironment, targetTranscript])

	const target = useMemo(() => {
		if (targetUser)
			return `${targetUser.firstName} ${targetUser.lastName}`
		else if (targetEnvironment)
			return targetEnvironment.name
		else if (targetTranscript)
			return targetTranscript.name
		else if (targetTag)
			return targetTag.name
	}, [targetUser, targetEnvironment, targetTranscript])

	if (userAction === undefined || target === undefined)
		return null

	return (
		<Box
			display='flex' flexDirection='row'
			justifyContent='space-between'
			alignItems='center'
			paddingY={1}
		>
			<Box display='flex' flexDirection='row' alignItems='center' paddingTop={1}>
				<Typography display='inline-block' variant='body1' fontWeight='bold'>
					{`${user.firstName} `}
					<span style={{color: 'gray'}}>
						{`${userAction} `}
					</span>
					{target}
				</Typography>
			</Box>
		</Box>
	)
}



const HistoryWidget = () => {

	const [history, setHistory] = useState<any[]>([])
	const { getEnvironmentLogs } = useStatisticsAPI()

	const { isLoading, isError, error } = useQuery(['logs'], () => getEnvironmentLogs(), {
		onSuccess: (data) => {
			setHistory(data)
		}
	})

	if (isLoading)
		return <Loading />

	if (isError)
		return <QueryError error={error} />

	if (history.length === 0 || history.length === undefined)
		return (
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
				<Typography variant='h6' sx={{paddingBottom: 2}}>Nothing to show yet :/</Typography>
			</Box>
		)

	return (
		<Box
			display='flex'
			flexDirection='column'
			width='100%'
			paddingX={5}
			sx={{
				overflowY: 'auto',
				'scrollbar-width': 'thin',
				'scrollbar-color': (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}`,
				'&::-webkit-scrollbar': {
					width: '7px',
					backgroundColor: (theme) => theme.palette.background.default,
					borderRadius: '10px'
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: (theme) => theme.palette.primary.main,
					borderRadius: '10px'
				}
			}}>
			{
				history.map((log) => (
					<HistoryItem key={log.id} {...log} />
				))
			}
		</Box>
	)
}

export default HistoryWidget
