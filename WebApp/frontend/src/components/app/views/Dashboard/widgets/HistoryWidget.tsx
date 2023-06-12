import { FC, useMemo, useState } from 'react'

import { useQueryClient } from 'react-query'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Box, Grid, Tooltip, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

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
	'create': 'created tag',
	'update': 'has made changes to tag',
	'delete': 'deleted tag'
}

interface HistoryItemI extends Log {
	compact?: boolean
}


export const HistoryItem: FC<HistoryItemI> = ({id, user, action, timestamp, targetUser, targetEnvironment, targetTranscript, targetTag, compact}) => {

	const { deleteLog } = useStatisticsAPI()

	const queryClient = useQueryClient()

	const { t } = useTranslation()

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

	if (compact)
		return (
			<Box
				display='flex'
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				paddingY={1}
			>
				<Box display='flex' flexDirection='row' alignItems='center' paddingTop={1}>
					<Typography display='inline-block' variant='body1' fontWeight='bold'>
						{`${user.firstName} `}
						<span style={{color: 'gray'}}>
							{`${t(userAction)} `}
						</span>
						{target}
					</Typography>
				</Box>
			</Box>
		)

	return (
		<Grid item xs={12}>
			<Box
				display='flex'
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				border='1px solid lightgray'
				boxShadow='0px 0px 5px lightgray'
				borderRadius='10px'
				padding={1}
				marginBottom={1}
			>
				<Box display='flex' flexDirection='row' alignItems='center' paddingTop={1}>
					<Typography display='inline-block' variant='body1' fontWeight='bold' color={theme => theme.palette.primary.main}>
						{`${user.firstName} `}
						<span style={{color: 'gray'}}>
							{`${t(userAction)} `}
						</span>
						{target}
					</Typography>
					<Typography display='inline-block' variant='body1' fontWeight='bold' color='gray' paddingLeft={1}>
						{`(${new Date(timestamp).toLocaleString()})`}
					</Typography>
				</Box>
				<Box display='flex' flexDirection='row' justifyContent='flex-end' sx={{cursor: 'pointer'}}>
					<Tooltip title='Delete log' placement='top' arrow disableInteractive>
						<ClearIcon
							color='error'
							onClick={() =>  {
								deleteLog(id).then(() => queryClient.invalidateQueries(['logs']))
							}}
						/>
					</Tooltip>
				</Box>
			</Box>
		</Grid>
	)
}



const HistoryWidget = () => {

	const { t } = useTranslation()

	const [history, setHistory] = useState<any[]>([])
	const { getEnvironmentLogs } = useStatisticsAPI()

	const { isLoading, isError, error } = useQuery(['logs'], () => getEnvironmentLogs(30), {
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
				<Typography variant='h6' sx={{paddingBottom: 2}}>{t('Nothing to show yet :/')}</Typography>
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
					<HistoryItem key={log.id} compact {...log}/>
				))
			}
		</Box>
	)
}

export default HistoryWidget
