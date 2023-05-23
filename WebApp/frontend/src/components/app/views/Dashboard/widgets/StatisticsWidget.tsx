import { useState } from 'react'

import { useQuery } from 'react-query'
import { Box, Typography } from '@mui/material'

import { Loading, QueryError } from 'components/common'

import { useStatisticsAPI, Statistics } from 'services/statistics.services'

const StatisticsWidget = () => {

	const { getEnvironmentStatistics } = useStatisticsAPI()

	const [statistics, setStatistics] = useState<Statistics>()

	const { isLoading, isError, error } = useQuery(['statistics'], () => getEnvironmentStatistics(), {
		onSuccess: (data) => {
			setStatistics(data)
		}
	})

	if (isLoading)
		return <Loading/>

	if (isError)
		return <QueryError error={error}/>


	return (
		<Box display='flex' width='100%' flexDirection='column' alignItems='stretch' paddingX={5}>
			<Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' paddingY={2}>
				<Typography fontWeight='bold'> Members </Typography>
				<Typography fontWeight='bold'> {statistics?.numberOfUsers} </Typography>
			</Box>
			<Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' paddingY={2}>
				<Typography fontWeight='bold'> Transcripts Created </Typography>
				<Typography fontWeight='bold'> {statistics?.numberOfTranscriptCreated} </Typography>
			</Box>
			<Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' paddingY={2}>
				<Typography fontWeight='bold'> Transcript Edited </Typography>
				<Typography fontWeight='bold'> 0 </Typography>
			</Box>
			<Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' paddingY={2}>
				<Typography fontWeight='bold'> Transcript Downloaded </Typography>
				<Typography fontWeight='bold'> 0 </Typography>
			</Box>
		</Box>
	)
}

export default StatisticsWidget
