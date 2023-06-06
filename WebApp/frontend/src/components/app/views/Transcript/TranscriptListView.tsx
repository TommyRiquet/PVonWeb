import { useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { DateTime } from 'luxon'
import { Box, Button, Chip, TextField, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { ListView, Loading, QueryError } from 'components/common'
import TranscriptAddDialog from './Dialogs/TranscriptAddDialog'
import TranscriptEditDialog from './Dialogs/TranscriptEditDialog'
import TranscriptDeleteDialog from './Dialogs/TranscriptDeleteDialog'

import { useGlobalContext } from 'contexts/GlobalContext'

import { Transcript, useTranscriptAPI } from 'services/transcripts.services'
import { Tag } from 'services/tags.services'



const TranscriptListView: React.FC = () => {

	const { isMobile } = useGlobalContext()

	const { t } = useTranslation()

	const { getListTranscript } = useTranscriptAPI()

	const [listTranscript, setListTranscript] = useState<Array<any>>([])
	const [searchText, setSearchText] = useState<string | null>(null)
	const [openEditTranscriptDialog, setOpenEditTranscriptDialog] = useState<boolean>(false)
	const [openDeleteTranscriptDialog, setOpenDeleteTranscriptDialog] = useState<boolean>(false)
	const [ selectedTranscript, setSelectedTranscript ] = useState<Transcript>(listTranscript[0])
	const [openAddDialog, setOpenAddDialog] = useState(false)

	const handleEditClick = (transcript: Transcript) => {
		setSelectedTranscript(transcript)
		setOpenEditTranscriptDialog(true)
	}

	const handleDeleteClick = async (transcript: Transcript) => {
		setSelectedTranscript(transcript)
		setOpenDeleteTranscriptDialog(true)
	}


	const columns = useMemo(() => {
		return [
			{
				field: 'name',
				headerName: t('Name'),
				flex: 1,
				minWidth: 200
			},
			{
				field: 'occurenceDate',
				headerName: t('Date'),
				flex: 1,
				minWidth: 150,
				renderCell: (params: any) => {
					return (
						<Typography>
							{DateTime.fromISO(params.value).toLocaleString(DateTime.DATETIME_SHORT)}
						</Typography>
					)
				}
			},
			{
				field: 'companyName',
				headerName: t('Company'),
				flex: 1,
				minWidth: 200
			},
			{
				field: 'tags',
				headerName: t('Tags'),
				flex: 1,
				minWidth: 200,
				sortable: false,
				renderCell: (params: any) => {
					return (
						<Box display='flex' flexWrap='nowrap'>
							{
								params.row.tags.map((tag: Tag) => (
									<Chip key={tag.id} label={tag.name} sx={{margin: 0.5}}/>
								))
							}
						</Box>
					)
				}
			},
			{
				field: 'buttons',
				headerName: '',
				hideable: false,
				sortable: false,
				editable: false,
				width: 250,
				renderCell: (value: any) => (
					<Box display='flex' flexDirection='row' justifyContent='space-between'>
						<Tooltip title={t('View Transcript')} placement='top' arrow disableInteractive>
							<Button href={value.row.link} disabled={!value.row.link} target='_blank' variant='contained' color='primary' sx={{marginRight: 1}}>
								<VisibilityIcon/>
							</Button>
						</Tooltip>
						<Tooltip title={t('Edit Transcript')} placement='top' arrow disableInteractive>
							<Button onClick={() => handleEditClick(value.row)} variant='outlined' color='primary' sx={{marginRight: 1}}>
								<EditIcon/>
							</Button>
						</Tooltip>
						<Tooltip title={t('Delete Transcript')} placement='top' arrow disableInteractive>
							<Button variant='outlined' onClick={() => handleDeleteClick(value.row)}>
								<DeleteIcon/>
							</Button>
						</Tooltip>
					</Box>
				)
			}
		]}, [])

	const filteredTranscripts = useMemo(() => {
		if (!searchText) {
			return listTranscript
		}
		let text = searchText
		text = text.replace(/[\])}[{(]/g, '')
		text = text.toLowerCase()

		const regex = new RegExp(text, 'gi')

		return listTranscript.filter((transcript) => {
			return regex.test(transcript.companyName) ||regex.test(transcript.name) || regex.test(transcript.tags.map((tag: Tag) => tag.name).join(' '))
		}).sort((a, b) => a.name.localeCompare(b.name))

	}, [searchText, listTranscript])

	const { isLoading, isError, error } = useQuery(['transcripts'], () => getListTranscript(), {
		onSuccess: (data) => {
			setListTranscript(data)
		}
	})

	if (isLoading)
		return <Loading/>

	if (isError)
		return <QueryError error={error}/>

	return (
		<Box display='flex' flexDirection='column' alignItems='stretch' paddingX={5}>
			<TranscriptAddDialog open={openAddDialog} handleClose={() => setOpenAddDialog(false)}/>
			<TranscriptEditDialog open={openEditTranscriptDialog} handleClose={() => setOpenEditTranscriptDialog(false)} transcript={selectedTranscript}/>
			<TranscriptDeleteDialog open={openDeleteTranscriptDialog} handleClose={() => setOpenDeleteTranscriptDialog(false)} transcript={selectedTranscript}/>
			<Box display='flex' justifyContent='space-between' paddingY={3}>
				<Box>
					<TextField
						placeholder={t('Search') as string}
						size='small'
						autoComplete='off'
						onChange={(event: any) => {
							setSearchText(event.target.value.toLowerCase())
						}}/>
				</Box>
				<Box>
					<Button variant='contained' color='primary' onClick={() => setOpenAddDialog(true)}>
						{
							isMobile ? <AddIcon/> : <Typography fontWeight='bold'>{t('Create')}</Typography>
						}
					</Button>
				</Box>
			</Box>

			<ListView
				columns={columns}
				rows={filteredTranscripts}
				initialState={{
					sorting: {
						sortModel: [{ field: 'occurenceDate', sort: 'desc' }]
					}
				}}
			/>
		</Box>
	)
}

export default TranscriptListView
