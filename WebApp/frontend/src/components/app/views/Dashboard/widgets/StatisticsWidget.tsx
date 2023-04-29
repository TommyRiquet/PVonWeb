import { useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'

import { Loading } from 'components/common'

import { useEnvironmentAPI, Statistics} from 'services/environment.services'

const StatisticsWidget = () => {

	const { getEnvironmentStatistics } = useEnvironmentAPI()

	const [statistics, setStatistics] = useState<Statistics>()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		setIsLoading(true)
		getEnvironmentStatistics().then((res) => {
			setStatistics(res)
			setIsLoading(false)
		})
	}, [])

	if (isLoading)
		return <Loading/>


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
