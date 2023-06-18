import { ChangeEvent, FC, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { useQuery } from 'react-query'
import { Box, Dialog, TextField, Typography, Button, CircularProgress, Snackbar, Alert, Autocomplete, SelectChangeEvent, Accordion, AccordionSummary, AccordionDetails, Tooltip, Checkbox, Grid, MenuItem, Select } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import _ from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { ChipSelect, Loading } from 'components/common'

import { Organization, Warrant, useTranscriptAPI } from 'services/transcripts.services'
import { Tag, useTagsAPI } from 'services/tags.services'


interface TranscriptDialogProps {
	open: boolean
	handleClose: () => void
}


const TranscriptSchema = yup.object().shape({
	name: yup.string().required('This field is required'),
	adminName: yup.string().required('This field is required'),
	scrutineerName: yup.string().required('This field is required'),
	secretaryName: yup.string().required('This field is required'),
	isConvocation: yup.boolean().required('This field is required'),
	isExact: yup.boolean().required('This field is required')
})



const DisplaySuccessfullDialog: FC<{link: string}> = ({link}) => {
	const { t } = useTranslation()
	return (
		<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' margin={3}>
			<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold'>
				{t('Transcript has been successfully added')}
			</Typography>
			<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold'>
				<a href={link} target='_blank' rel='noreferrer'>{t('Click here to download')}</a>
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
	const [adminWarrants, setAdminWarrants] = useState<Warrant[]>([])
	const [participantAccordionExpanded, setParticipantAccordionExpanded] = useState(false)
	const [warrantAccordionExpanded, setWarrantAccordionExpanded] = useState(false)
	const [otherAccordionExpanded, setOtherAccordionExpanded] = useState(false)

	const { handleSubmit, control, setValue, formState: { errors }} = useForm({ resolver: yupResolver(TranscriptSchema) })

	const isConvened = useWatch({ control, name: 'isConvocation', defaultValue: true })


	const handleCloseDialog = () => {
		handleClose()
		setOrganization(null)
		setValue('name', '')
		setValue('adminName', '')
		setValue('secretaryName', '')
		setValue('scrutineerName', '')
		setValue('isConvocation', true)
		setValue('isExact', true)
		setSelectedTags([])
		setIsLoading(false)
		setUpdateError(false)
		setShowSuccessDialog(false)
		setErrorMessage('')
		setParticipantAccordionExpanded(false)
		setWarrantAccordionExpanded(false)
		setOtherAccordionExpanded(false)
		setAdminWarrants([])
	}

	const handleGenerateTranscript = async (data: any) => {
		setIsLoading(true)
		const result = await createTranscript(data, selectedTags, organization!, adminWarrants)
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

	const handleWarrantStateChange = (event: SelectChangeEvent<string>, index: number) => {
		const { target: { value } } = event
		const newAdminWarrants = [...adminWarrants]
		newAdminWarrants[index].state = value
		setAdminWarrants(newAdminWarrants)
	}

	const handleWarrantDurationChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
		const { target: { value } } = event
		if (parseInt(value) >= 0) {
			const newAdminWarrants = [...adminWarrants]
			newAdminWarrants[index].duration = parseInt(value)
			setAdminWarrants(newAdminWarrants)
		}
	}

	const handleSelectTags = (event: SelectChangeEvent<any>) => {
		const { target: { value } } = event
		const selectedTags = value.map((item: string) => listTags.find((tag) => tag.name === item))
		setSelectedTags(selectedTags)
	}

	const handleOrganizationData = (data: any) => {
		setOrganizationData(data)
		setAdminWarrants(data[0].administrators.map((admin: any) => ({adminName: `${admin.firstName} ${admin.lastName}`, state: 'free', duration: 0})))
	}

	useEffect(() => {
		if(!isConvened)
			setValue('isExact', false)
	}, [isConvened])

	const { isLoading: isOrganizationsLoading } = useQuery(['organizations'], () => getOrganizationOptions(), {
		onSuccess: (data) => {
			handleOrganizationData(data)
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
												setAdminWarrants(selectedOrganization?.administrators.map((admin: any) => ({adminName: `${admin.firstName} ${admin.lastName}`, state: 'free', duration: 0})) as any || [])
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
											autoComplete='off'
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
								<Box marginTop={1}>
									<ChipSelect
										label={t('Tags')}
										allChips={listTags}
										selectedChips={selectedTags}
										handleChange={handleSelectTags}
									/>
								</Box>
								<Accordion expanded={participantAccordionExpanded} sx={{marginTop: 2}}>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls='participants-content'
										id='participants-header'
										onClick={() => {
											if(participantAccordionExpanded){
												setParticipantAccordionExpanded(false)
											}
											else{
												setParticipantAccordionExpanded(true)
												setOtherAccordionExpanded(false)
												setWarrantAccordionExpanded(false)
											}
										}}
									>
										<Typography>{t('Participants')}</Typography>
									</AccordionSummary>
									<Controller
										render={({ field }) => (
											<TextField
												label={t('Administrator')}
												fullWidth
												margin='normal'
												autoComplete='off'
												variant='outlined'
												size='small'
												error={!!errors.adminName}
												helperText={errors.adminName?.message as string}
												sx={{
													marginLeft: 2,
													paddingRight: 4
												}}
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
												label={t('Scrutineer')}
												fullWidth
												margin='normal'
												autoComplete='off'
												variant='outlined'
												size='small'
												error={!!errors.scrutineerName}
												helperText={errors.scrutineerName?.message as string}
												sx={{
													marginLeft: 2,
													paddingRight: 4
												}}
												{...field}
											/>
										)}
										name='scrutineerName'
										control={control}
										defaultValue=''
									/>
									<Controller
										render={({ field }) => (
											<TextField
												label={t('Secretary')}
												fullWidth
												margin='normal'
												autoComplete='off'
												variant='outlined'
												size='small'
												error={!!errors.secretaryName}
												helperText={errors.secretaryName?.message as string}
												sx={{
													marginLeft: 2,
													paddingRight: 4
												}}
												{...field}
											/>
										)}
										name='secretaryName'
										control={control}
										defaultValue=''
									/>
								</Accordion>
								<Accordion expanded={warrantAccordionExpanded} sx={{marginTop: 2}}>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls='warrants-content'
										id='warrants-header'
										onClick={() => {
											if(warrantAccordionExpanded){
												setWarrantAccordionExpanded(false)
											}
											else{
												setWarrantAccordionExpanded(true)
												setParticipantAccordionExpanded(false)
												setOtherAccordionExpanded(false)
											}
										}}
									>
										<Typography>{t('Warrants')}</Typography>
									</AccordionSummary>
									<AccordionDetails>
										{
											adminWarrants.map((warrant, index) => (
												<Grid container key={warrant.id} sx={{marginTop: index!== 0 ? 2 : 0}}>
													<Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
														{warrant?.adminName}
													</Grid>
													<Grid item xs={6}>
														<Select
															variant='outlined'
															size='small'
															fullWidth
															defaultValue={warrant.state}
															onChange={(e) => handleWarrantStateChange(e, index)}
														>
															<MenuItem value='free'>{t('Free')}</MenuItem>
															<MenuItem value='resigned'>{t('Resigned')}</MenuItem>
															<MenuItem value='renewed'>{t('Renewed')}</MenuItem>
														</Select>
													</Grid>

													{
														warrant.state === 'renewed' &&
														<>
															<Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
																{t('Warrant Duration (year)')}
															</Grid>
															<Grid item xs={6}>
																<TextField
																	margin='normal'
																	variant='outlined'
																	fullWidth
																	size='small'
																	type='number'
																	defaultValue={warrant.duration}
																	value={warrant.duration}
																	onChange={(e) => handleWarrantDurationChange(e, index)}
																/>
															</Grid>
														</>
													}
												</Grid>
											))
										}
									</AccordionDetails>
								</Accordion>
								<Accordion expanded={otherAccordionExpanded} sx={{marginTop: 2}}>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls='more-details-content'
										id='more-details-header'
										onClick={() => {
											if(otherAccordionExpanded){
												setOtherAccordionExpanded(false)
											}
											else{
												setOtherAccordionExpanded(true)
												setWarrantAccordionExpanded(false)
												setParticipantAccordionExpanded(false)
											}
										}}
									>
										<Typography>{t('More details')}</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' width='100%'>
											<Tooltip title={t('The General Meeting has been validly convened')} placement='top' arrow disableInteractive>
												<Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' width='100%'>
													<Typography>{t('Convened')}</Typography>
													<Controller
														render={({ field }) => (
															<Checkbox
																checked={field.value}
																{...field}
															/>
														)}
														name='isConvocation'
														control={control}
														defaultValue={true}
													/>
												</Box>
											</Tooltip>
											<Tooltip title={isConvened ? t('The general meeting recognizes as accurate the statement of validity') : t('The general meeting must be convened to recognize its validity')} placement='top' arrow disableInteractive>
												<Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' width='100%'>
													<Typography>{t('Valid')}</Typography>
													<Controller
														render={({ field }) => (
															<Checkbox
																checked={isConvened ? field.value : false}
																disabled={!isConvened}
																{...field}
															/>
														)}
														name='isExact'
														control={control}
														defaultValue={true}
													/>
												</Box>
											</Tooltip>
										</Box>
									</AccordionDetails>
								</Accordion>
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
