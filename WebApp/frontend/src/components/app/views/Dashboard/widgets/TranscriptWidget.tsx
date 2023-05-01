import { useState, useMemo } from 'react'

import { Box, Typography, Button } from '@mui/material'

import { Loading } from 'components/common'

import { useTranscriptAPI, Transcript } from 'services/transcripts.services'


const TranscriptWidget = () => {

	const [listTranscript, setListTranscript] = useState<Transcript[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { getListTranscript } = useTranscriptAPI()

	useMemo(() => {
		setIsLoading(true)
		getListTranscript(20).then(res => {
			setListTranscript(res)
			setIsLoading(false)
		})
	}, [])

	if (isLoading)
		return <Loading />

	if (listTranscript.length === 0)
		return (
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
				<Typography variant='h5' sx={{paddingBottom: 2}}>No transcript</Typography>
				<Typography variant='body2' sx={{paddingBottom: 1}}>Do you want to create one ?</Typography>
				<Button variant='contained' color='primary' href='/transcript'>Create</Button>
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
					</Box>
				))
			}
		</Box>
	)
}

export default TranscriptWidget
