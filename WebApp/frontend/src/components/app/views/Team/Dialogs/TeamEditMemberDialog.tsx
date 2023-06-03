import { FC, useEffect, useState } from 'react'

import { useQueryClient } from 'react-query'
import { useTranslation } from 'react-i18next'
import { Box, Dialog, TextField, Typography, Button, CircularProgress, Snackbar, Alert, Select, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useTeamAPI } from 'services/teams.services'
import { User } from 'services/users.services'


interface TeamEditMemberDialogProps {
	open: boolean
	handleClose: () => void
	user: User
}


const ProfileSchema = yup.object().shape({
	firstName: yup.string().required('This field is required'),
	lastName: yup.string().required('This field is required'),
	email: yup.string().required('This field is required'),
	role: yup.string().required('This field is required')
})


const DisplayEmailDialog: FC = () => {
	const { t } = useTranslation()
	return (
		<Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' margin={3}>
			<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold'>
				{t('User role has been updated.')}
			</Typography>
		</Box>
	)
}

const TeamEditMemberDialog: FC<TeamEditMemberDialogProps> = ({open, handleClose, user}) => {

	const { t } = useTranslation()

	const queryClient = useQueryClient()

	const [updateError, setUpdateError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showEmailDialog, setShowEmailDialog] = useState(false)

	const { editUser } = useTeamAPI()

	const { handleSubmit, control, setValue, formState: { errors }} = useForm({ resolver: yupResolver(ProfileSchema) })

	const handleEditRole = async (data: any) => {
		setIsLoading(true)
		const result = await editUser(user, data)
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
		setValue('firstName', user.firstName)
		setValue('lastName', user.lastName)
		setValue('email', user.email)
		setValue('phoneNumber', user.phoneNumber)
		setValue('role', user.role)
		handleClose()
	}

	useEffect(() => {
		if (open){
			setValue('firstName', user.firstName)
			setValue('lastName', user.lastName)
			setValue('email', user.email)
			setValue('phoneNumber', user.phoneNumber)
			setValue('role', user.role)
		}
	}, [open])

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
					{t('User role has been updated !')}
				</Alert>
			</Snackbar>
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' margin={3}>
				<CloseIcon fontSize='large' color='disabled' onClick={handleCloseDialog} sx={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer' }}/>
				<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>{t('Edit role')}</Typography>
				{
					showEmailDialog ?
						<DisplayEmailDialog/>
						:
						<form onSubmit={handleSubmit((data) => handleEditRole(data))} >
							<Box display='flex' width='100%' flexDirection='row'>
								<Controller
									render={({ field }) => (
										<TextField
											label={t('First Name')}
											fullWidth
											margin='normal'
											variant='outlined'
											size='small'
											disabled={true}
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
											disabled={true}
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
										disabled={true}
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
										disabled={true}
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
									<Select
										label={t('Role')}
										fullWidth
										variant='outlined'
										size='small'
										error={!!errors.role}
										{...field}
									>
										<MenuItem key='admin' value='admin'>Admin</MenuItem>
										<MenuItem key='user' value='user'>User</MenuItem>
									</Select>
								)}
								name='role'
								control={control}
							/>
							<Button type='submit' variant='contained' disabled={isLoading} sx={{height: 45, width: '100%', marginTop: 2}}>
								{ isLoading ? <CircularProgress size={25} /> : t('Edit') }
							</Button>
						</form>
				}
			</Box>
		</Dialog>
	)
}



export default TeamEditMemberDialog
