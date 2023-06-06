import { FC, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { useForm, Controller } from 'react-hook-form'
import { useQuery } from 'react-query'
import { Box, Dialog, TextField, Typography, Button, CircularProgress, Snackbar, Alert, Autocomplete, SelectChangeEvent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import _ from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { ChipSelect, Loading } from 'components/common'

import { Organization, useTranscriptAPI } from 'services/transcripts.services'
import { Tag, useTagsAPI } from 'services/tags.services'


interface TranscriptDialogProps {
	open: boolean
	handleClose: () => void
}


const TranscriptSchema = yup.object().shape({
	name: yup.string().required('This field is required'),
	adminName: yup.string().required('This field is required'),
	scrutineerName: yup.string().required('This field is required'),
	secretaryName: yup.string().required('This field is required')
})



const DisplaySuccessfullDialog: FC<{link: string}> = ({link}) => {
	const { t } = useTranslation()
	return (
		<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' margin={3}>
			<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold'>
				{t('Transcript has been successfully added')}
			</Typography>
			<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold'>
				<a href={link} target='_blank' rel='noreferrer'>Click here to download</a>
			</Typography>
		</Box>
	)
}

const TranscriptAddDialog: FC<TranscriptDialogProps> = ({open, handleClose}) => {

	const { t } = useTranslation()

	const { getOrganizationOptions, createTranscript } = useTranscriptAPI()
	const { getTags } = useTagsAPI()
	const queryClient = useQueryClient()

	const [updateError, setUpdateError] = useState(false)
	const [showSuccessDialog, setShowSuccessDialog] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [organization, setOrganization] = useState<Organization|null>()
	const [organizationData, setOrganizationData] = useState<Organization[]>([])
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [listTags, setListTags] = useState<Tag[]>([])
	const [link, setLink] = useState('')

	const { handleSubmit, control, setValue, formState: { errors }} = useForm({ resolver: yupResolver(TranscriptSchema) })


	const handleCloseDialog = () => {
		handleClose()
		setOrganization(null)
		setValue('name', '')
		setValue('adminName', '')
		setValue('secretaryName', '')
		setValue('scrutineerName', '')
		setSelectedTags([])
		setIsLoading(false)
		setUpdateError(false)
		setShowSuccessDialog(false)
	}

	const handleGenerateTranscript = async (data: any) => {
		setIsLoading(true)
		const result = await createTranscript(data, selectedTags, organization!)
		if (result.status === 200) {
			setLink(result.link.filename)
			setIsLoading(false)
			queryClient.invalidateQueries(['transcripts'])
			setShowSuccessDialog(true)
		} else {
			setIsLoading(false)
			setUpdateError(true)
			setErrorMessage(result.message)
		}
	}

	const handleSelectTags = (event: SelectChangeEvent<any>) => {
		const { target: { value } } = event
		const selectedTags = value.map((item: string) => listTags.find((tag) => tag.name === item))
		setSelectedTags(selectedTags)
	}

	const { isLoading: isOrganizationsLoading } = useQuery(['organizations'], () => getOrganizationOptions(), {
		onSuccess: (data) => {
			setOrganizationData(data)
		}
	})

	const { isLoading: isTagsLoading } = useQuery(['tags'], () => getTags(), {
		onSuccess: (data) => {
			setListTags(data)
		}
	})


	if ( (isTagsLoading || isOrganizationsLoading) && open )
		return <Loading/>

	return (
		<Dialog
			fullWidth={true}
			open={open}
			onClose={handleCloseDialog}
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
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' margin={3} >
				<CloseIcon fontSize='large' color='disabled' onClick={handleCloseDialog} sx={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer' }}/>
				<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>{t('Transcript')}</Typography>
				{
					showSuccessDialog ? <DisplaySuccessfullDialog link={link}/> :
						<form onSubmit={handleSubmit((data) => handleGenerateTranscript(data))} style={{width: '100%'}}>
							<Controller
								render={() => (
									<Autocomplete
										disablePortal
										options={_.isArray(organizationData) ? organizationData.map((item) => item.name) : []}
										onChange={
											(_, value) => {
												const selectedOrganization = organizationData.find((item) => item.name === value)
												setOrganization(selectedOrganization)
												setValue('adminName', `${selectedOrganization?.administrators[0]?.firstName} ${selectedOrganization?.administrators[0]?.lastName}`)
											}
										}
										size='small'
										renderInput={
											(params) => <TextField
												label={t('Company')}
												variant='outlined'
												{...params}
											/>
										}
									/>)}
								name='companyName'
								control={control}
							/>
							<Box visibility={organization ? 'visible' : 'hidden'}>
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
											{...field}
										/>
									)}
									name='name'
									control={control}
								/>
								<Controller
									render={({ field }) => (
										<TextField
											label={t('Administrator')}
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
									defaultValue=''
									control={control}
								/>
								<Controller
									render={({ field }) => (
										<TextField
											label={t('Secretary')}
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
									defaultValue=''
								/>
								<Controller
									render={({ field }) => (
										<TextField
											label={t('Scrutineer')}
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
									defaultValue=''
								/>
								<Box marginTop={1}>
									<ChipSelect
										label={t('Tags')}
										allChips={listTags}
										selectedChips={selectedTags}
										handleChange={handleSelectTags}
									/>
								</Box>
								<Button type='submit' variant='contained' disabled={isLoading} sx={{ height: 45, width: '100%', marginTop: 2 }}>
									{ isLoading ? <CircularProgress size={25} /> : t('Generate Transcript') }
								</Button>
							</Box>
						</form>
				}
			</Box>
		</Dialog>
	)
}



export default TranscriptAddDialog
