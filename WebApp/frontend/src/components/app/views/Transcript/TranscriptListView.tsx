import { useMemo, useState } from 'react'

import { Box, Button, TextField, Typography } from '@mui/material'
import { ListView } from 'components/common'

import { useTranscriptAPI } from 'services/transcripts.services'

const columns = [
	{
		field: 'id',
		headerName: 'ID',
		hideable: false,
		width: 80
	},
	{
		field: 'name',
		headerName: 'Name',
		hideable: false,
		flex: 1
	},
	{
		field: 'occurenceDate',
		headerName: 'Date',
		hideable: false,
		flex: 1
	},
	{
		field: 'adminName',
		headerName: 'Admin',
		hideable: false,
		flex: 1
	}
]


const TranscriptListView: React.FC = () => {
	const { getListTranscript } = useTranscriptAPI()
	const [listTranscript, setListTranscript] = useState<Array<any>>([])
	const [searchText, setSearchText] = useState<string | null>(null)

	console.log(listTranscript)
	const filteredTranscripts = useMemo(() => {
		if (!searchText) {
			return listTranscript
		}

		const regex = new RegExp(searchText, 'i')

		return listTranscript.filter((transcript) => {
			return regex.test(transcript.id) ||regex.test(transcript.name)
		}).sort((a, b) => a.name.localeCompare(b.name))

	}, [searchText, listTranscript])

	useMemo(() => {
		getListTranscript().then(res => setListTranscript(res))
	}, [])

	return (
		<Box display='flex' flexDirection='column' alignItems='stretch' paddingX={5}>
			<Box display='flex' justifyContent='space-between' paddingY={3}>
				<Box>
					<TextField
						placeholder='Search'
						size='small'
						autoComplete='off'
						onChange={(event: any) => {
							setSearchText(event.target.value.toLowerCase())
						}}/>
				</Box>
				<Box>
					<Button variant='contained' color='primary' onClick={() => console.log('/transcript/create')}>
						<Typography fontWeight='bold'>Create</Typography>
					</Button>
				</Box>
			</Box>

			<ListView columns={columns} rows={filteredTranscripts}/>
		</Box>
	)
}

export default TranscriptListView
