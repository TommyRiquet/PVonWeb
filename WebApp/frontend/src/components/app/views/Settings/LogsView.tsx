import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Box, Grid, Typography } from '@mui/material'

import { Loading, QueryError } from 'components/common'
import { HistoryItem } from '../Dashboard/widgets/HistoryWidget'

import { useStatisticsAPI } from 'services/statistics.services'

const LogsView: React.FC = () => {

	const { t } = useTranslation()

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

	if(history.length === 0){
		return (
			<Box display='flex' flexDirection='column' width='100%' maxHeight='100vh'>
				<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>{t('Logs')}</Typography>
				<Box height='60vh' overflow='auto' border='1px solid lightgray' padding={1} display='flex' justifyContent='center' alignItems='center'>
					<Typography variant='h6' sx={{paddingBottom: 2}} color={theme => theme.palette.primary.main}>{t('Nothing to show yet :/')}</Typography>
				</Box>
			</Box>
		)
	}

	return (
		<Box display='flex' flexDirection='column' width='100%' maxHeight='100vh'>
			<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>{t('Logs')}</Typography>
			<Box height='60vh' overflow='auto' border='1px solid lightgray' padding={1}>
				<Grid container>
					{
						history.map((log) => (
							<HistoryItem key={log.id} {...log} />
						))
					}
				</Grid>
			</Box>
		</Box>
	)
}

export default LogsView
