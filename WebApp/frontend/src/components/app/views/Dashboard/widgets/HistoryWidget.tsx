import { FC, useMemo, useState } from 'react'

import { Box, Typography } from '@mui/material'

import { Loading } from 'components/common'

import { useEnvironmentAPI, Log } from 'services/environment.services'


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


const HistoryItem: FC<Log> = ({user, action, targetUser, targetEnvironment, targetTranscript}) => {

	const userAction = useMemo(() => {
		if (targetUser)
			return userActions[action as keyof typeof userActions]
		else if (targetEnvironment)
			return environmentActions[action as keyof typeof environmentActions]
		else if (targetTranscript)
			return transcriptActions[action as keyof typeof transcriptActions]
	}, [targetUser, targetEnvironment, targetTranscript])

	const target = useMemo(() => {
		if (targetUser)
			return `${targetUser.firstName} ${targetUser.lastName}`
		else if (targetEnvironment)
			return targetEnvironment.name
		else if (targetTranscript)
			return targetTranscript.name
	}, [targetUser, targetEnvironment, targetTranscript])

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
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { getEnvironmentLogs } = useEnvironmentAPI()

	useMemo(() => {
		setIsLoading(true)
		getEnvironmentLogs().then(res => {
			setHistory(res)
			setIsLoading(false)
		})
	}, [])

	if (isLoading)
		return <Loading />

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
