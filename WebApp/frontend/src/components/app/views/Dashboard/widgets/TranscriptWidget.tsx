import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Box, Typography, Button, Tooltip } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { Loading, QueryError } from 'components/common'

import { useTranscriptAPI, Transcript } from 'services/transcripts.services'


const TranscriptWidget = () => {

	const [listTranscript, setListTranscript] = useState<Transcript[]>([])
	const { getListTranscript } = useTranscriptAPI()

	const { t } = useTranslation()

	const { isLoading, isError, error } = useQuery(['transcripts'], () => getListTranscript(), {
		onSuccess: (data) => {
			setListTranscript(data)
		}
	})

	if (isLoading)
		return <Loading />

	if (isError)
		return <QueryError error={error} />

	if (listTranscript.length === 0)
		return (
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
				<Typography variant='h6' sx={{paddingBottom: 2}}>{t('No transcript')}</Typography>
				<Typography variant='body2' sx={{paddingBottom: 1}}>{t('Do you want to create one ?')}</Typography>
				<Button variant='contained' color='primary' href='/transcript'>{t('Create')}</Button>
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
				listTranscript.map((transcript) => (
					<Box
						key={transcript.id}
						display='flex' flexDirection='row'
						justifyContent='space-between'
						alignItems='center'
						paddingY={1}
					>
						<Box display='flex' flexDirection='row' alignItems='center' paddingTop={1}>
							<Typography variant='body1' fontWeight='bold'>
								{transcript.name}
							</Typography>
						</Box>
						<Box display='flex' flexDirection='row' alignItems='center' paddingTop={1}>
							<Tooltip title={t('View Transcript')} placement='top' arrow disableInteractive>
								<Button href={transcript.link} disabled={!transcript.link} target='_blank' size='small' variant='contained' color='primary' sx={{marginRight: 1}}>
									<VisibilityIcon/>
								</Button>
							</Tooltip>
						</Box>
					</Box>
				))
			}
		</Box>
	)
}

export default TranscriptWidget
