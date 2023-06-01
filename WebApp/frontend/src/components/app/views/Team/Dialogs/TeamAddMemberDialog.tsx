import { FC, useState } from 'react'

import { useQueryClient } from 'react-query'
import { useTranslation } from 'react-i18next'
import { Box, Dialog, TextField, Typography, Button, CircularProgress, Snackbar, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useTeamAPI } from 'services/teams.services'


interface TeamAddMemberDialogProps {
	open: boolean
	handleClose: () => void
}


const ProfileSchema = yup.object().shape({
	firstName: yup.string().required('This field is required'),
	lastName: yup.string().required('This field is required'),
	email: yup.string().required('This field is required'),
	password: yup.string().required('This field is required').min(6, 'Password must be at least 6 characters long'),
	phoneNumber: yup.string()
})


const DisplayEmailDialog: FC = () => {
	const { t } = useTranslation()
	return (
		<Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' margin={3}>
			<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold'>
				{t('User has been added to the Environment.')}
			</Typography>
		</Box>
	)
}

const TeamAddMemberDialog: FC<TeamAddMemberDialogProps> = ({open, handleClose}) => {

	const { t } = useTranslation()

	const queryClient = useQueryClient()

	const [updateError, setUpdateError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showEmailDialog, setShowEmailDialog] = useState(false)

	const { addUser } = useTeamAPI()

	const { handleSubmit, control, setValue, formState: { errors }} = useForm({ resolver: yupResolver(ProfileSchema) })

	const handleAddMember = async (data: any) => {
		setIsLoading(true)
		const result = await addUser(data)
		if (result.status === 200) {
			setIsLoading(false)
			setUpdateSuccess(true)
			setShowEmailDialog(true)
			queryClient.invalidateQueries('members')
		} else {
			setIsLoading(false)
			setUpdateError(true)
			setErrorMessage(result.message)
		}
	}

	const handleCloseDialog = () => {
		setShowEmailDialog(false)
		setIsLoading(false)
		setUpdateError(false)
		setUpdateSuccess(false)
		setValue('firstName', '')
		setValue('lastName', '')
		setValue('email', '')
		setValue('phoneNumber', '')
		setValue('password', '')
		handleClose()
	}

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
					{t('User has been invited !')}
				</Alert>
			</Snackbar>
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' margin={3}>
				<CloseIcon fontSize='large' color='disabled' onClick={handleCloseDialog} sx={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer' }}/>
				<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>{t('Add Member')}</Typography>
				{
					showEmailDialog ?
						<DisplayEmailDialog/>
						:
						<form onSubmit={handleSubmit((data) => handleAddMember(data))} >
							<Box display='flex' width='100%' flexDirection='row'>
								<Controller
									render={({ field }) => (
										<TextField
											label={t('First Name')}
											fullWidth
											margin='normal'
											variant='outlined'
											size='small'
											error={!!errors.firstName}
											helperText={errors.firstName?.message as string}
											sx={{ marginRight: 1 }}
											{...field}
										/>
									)}
									name='firstName'
									control={control}
								/>
								<Controller
									render={({ field }) => (
										<TextField
											label={t('Last Name')}
											fullWidth
											margin='normal'
											variant='outlined'
											size='small'
											error={!!errors.lastName}
											helperText={errors.lastName?.message as string}
											sx={{ marginLeft: 1 }}
											{...field}
										/>
									)}
									name='lastName'
									control={control}
								/>
							</Box>
							<Controller
								render={({ field }) => (
									<TextField
										label={t('Email')}
										fullWidth
										margin='normal'
										variant='outlined'
										size='small'
										type='email'
										error={!!errors.email}
										helperText={errors.email?.message as string}
										{...field}
									/>
								)}
								name='email'
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<TextField
										label={t('Phone Number')}
										fullWidth
										margin='normal'
										variant='outlined'
										size='small'
										error={!!errors.phoneNumber}
										helperText={errors.phoneNumber?.message as string}
										{...field}
									/>
								)}
								name='phoneNumber'
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<TextField
										label={t('Password')}
										fullWidth
										margin='normal'
										variant='outlined'
										size='small'
										type='password'
										error={!!errors.password}
										helperText={errors.password?.message as string}
										{...field}
									/>
								)}
								name='password'
								control={control}
							/>
							<Button type='submit' variant='contained' disabled={isLoading} sx={{height: 45, width: '100%', marginTop: 2}}>
								{ isLoading ? <CircularProgress size={25} /> : t('Invite') }
							</Button>
						</form>
				}
			</Box>
		</Dialog>
	)
}



export default TeamAddMemberDialog
