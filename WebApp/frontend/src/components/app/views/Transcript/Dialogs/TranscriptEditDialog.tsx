import { FC, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from 'react-query'
import { Box, Dialog, TextField, Typography, Button, CircularProgress, Snackbar, Alert, SelectChangeEvent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Loading, ChipSelect } from 'components/common'

import { Transcript, useTranscriptAPI } from 'services/transcripts.services'
import { Tag, useTagsAPI } from 'services/tags.services'


interface TranscriptEditDialogProps {
	open: boolean
	transcript: Transcript
	handleClose: () => void
}


const TranscriptSchema = yup.object().shape({
	name: yup.string().required('This field is required'),
	companyName: yup.string().required('This field is required'),
	adminName: yup.string().required('This field is required'),
	scrutineerName: yup.string().required('This field is required'),
	secretaryName: yup.string().required('This field is required')
})


const DisplayTranscriptSuccessDialog: FC = () => {
	const { t } = useTranslation()
	return (
		<Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' margin={3}>
			<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold'>
				{t('Transcript has been updated successfully !')}
			</Typography>
		</Box>
	)
}

const TranscriptEditDialog: FC<TranscriptEditDialogProps> = ({open, transcript, handleClose}) => {

	const { t } = useTranslation()

	const [updateError, setUpdateError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [listTags, setListTags] = useState<Tag[]>([])
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [showSuccessDialog, setShowSuccessDialog] = useState(false)

	const { updateTranscript } = useTranscriptAPI()
	const { getTags } = useTagsAPI()

	const queryClient = useQueryClient()

	const { handleSubmit, control, setValue, formState: { errors }} = useForm({ resolver: yupResolver(TranscriptSchema) })

	const handleAddMember = async (data: any) => {
		setIsLoading(true)
		const result = await updateTranscript(data, transcript, selectedTags)
		if (result.status === 200) {
			setIsLoading(false)
			setUpdateSuccess(true)
			setShowSuccessDialog(true)
			setTimeout(() => {
				handleCloseDialog()
			}, 2000)
		} else if (result.errno === 1062) {
			setIsLoading(false)
			setUpdateError(true)
			setErrorMessage(t('Tag name already exists.') as string)
		} else {
			setIsLoading(false)
			setUpdateError(true)
			setErrorMessage(result.message)
		}
	}

	useEffect(() => {
		if (transcript) {
			setValue('name', transcript.name)
			setValue('companyName', transcript.companyName)
			setValue('adminName', transcript.adminName)
			setValue('scrutineerName', transcript.scrutineerName)
			setValue('secretaryName', transcript.secretaryName)
			setSelectedTags(transcript.tags)
		}
	}, [transcript])

	const handleCloseDialog = () => {
		setShowSuccessDialog(false)
		handleClose()
		queryClient.invalidateQueries(['transcripts'])
		setValue('name', transcript.name)
		setValue('companyName', transcript.companyName)
		setValue('adminName', transcript.adminName)
		setValue('scrutineerName', transcript.scrutineerName)
		setValue('secretaryName', transcript.secretaryName)
		setSelectedTags(transcript.tags)
		setIsLoading(false)
	}

	const handleSelectTags = (event: SelectChangeEvent<any>) => {
		const { target: { value } } = event
		const selectedTags = value.map((item: string) => listTags.find((tag) => tag.name === item))
		setSelectedTags(selectedTags)
	}

	const { isLoading: isTagsLoading } = useQuery(['tags'], () => getTags(), {
		onSuccess: (data) => {
			setListTags(data)
		}
	})

	if ( isTagsLoading )
		return <Loading/>

	return (
		<Dialog
			fullWidth={true}
			open={open}
			onClose={handleCloseDialog}
			transitionDuration={0}
		>
			<Snackbar
				open={updateError}
				onClose={() => {setUpdateError(false)}}
				autoHideDuration={2000}
			>
				<Alert severity='error'>
					{errorMessage}
				</Alert>
			</Snackbar>
			<Snackbar
				open={updateSuccess}
				onClose={() => { setUpdateSuccess(false)} }
				autoHideDuration={2000}
			>
				<Alert>
					{t('Transcript has been updated successfully !')}
				</Alert>
			</Snackbar>
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' margin={3}>
				<CloseIcon fontSize='large' color='disabled' onClick={handleCloseDialog} sx={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer' }}/>
				<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>{t('Edit Transcript')}</Typography>
				{
					showSuccessDialog ?
						<DisplayTranscriptSuccessDialog/>
						:
						<form onSubmit={handleSubmit((data) => handleAddMember(data))} >
							<Controller
								render={({ field }) => (
									<TextField
										label={t('Transcript Name')}
										fullWidth
										margin='normal'
										variant='outlined'
										size='small'
										error={!!errors.name}
										helperText={errors.name?.message as string}
										sx={{ marginRight: 1 }}
										{...field}
									/>
								)}
								name='name'
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<TextField
										label={t('Company Name')}
										fullWidth
										margin='normal'
										variant='outlined'
										size='small'
										disabled
										error={!!errors.companyName}
										helperText={errors.companyName?.message as string}
										{...field}
									/>
								)}
								name='companyName'
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<TextField
										label={t('Transcript Admin')}
										fullWidth
										margin='normal'
										variant='outlined'
										size='small'
										error={!!errors.adminName}
										helperText={errors.adminName?.message as string}
										{...field}
									/>
								)}
								name='adminName'
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<TextField
										label={t('Transcript Scrutineer')}
										fullWidth
										margin='normal'
										variant='outlined'
										size='small'
										error={!!errors.scrutineerName}
										helperText={errors.scrutineerName?.message as string}
										{...field}
									/>
								)}
								name='scrutineerName'
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<TextField
										label={t('Transcript Secretary')}
										fullWidth
										margin='normal'
										variant='outlined'
										size='small'
										error={!!errors.secretaryName}
										helperText={errors.secretaryName?.message as string}
										{...field}
									/>
								)}
								name='secretaryName'
								control={control}
							/>
							<ChipSelect
								label={t('Tags')}
								allChips={listTags}
								selectedChips={selectedTags}
								handleChange={handleSelectTags}
							/>
							<Button type='submit' variant='contained' disabled={isLoading} sx={{height: 45, width: '100%', marginTop: 2}}>
								{ isLoading ? <CircularProgress size={25} /> : t('Save Transcript') }
							</Button>
						</form>
				}
			</Box>
		</Dialog>
	)
}



export default TranscriptEditDialog
