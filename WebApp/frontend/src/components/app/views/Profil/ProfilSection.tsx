import { FC, useState, useEffect } from 'react'

import { Box, Button, TextField, Stack, Snackbar, Alert, Typography, CircularProgress } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import useCurrentUser from 'hooks/useCurrentUser'

import { Loading } from 'components/common'

import { useGlobalContext } from 'contexts/GlobalContext'

const ProfileSchema = yup.object().shape({
	firstName: yup.string().required('This field is required').max(40, 'First Name must be at most 40 characters'),
	lastName: yup.string().required('This field is required').max(40, 'Last Name must be at most 40 characters'),
	email: yup.string(),
	phoneNumber: yup.string().max(15, 'Phone Number must be at most 15 characters').nullable()
})

const ProfileSection: FC = () => {

	const { isMobile } = useGlobalContext()

	const [updateError, setUpdateError] = useState(false)
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { userProfile, updateCurrentUser } = useCurrentUser()

	const { handleSubmit, setValue, control, formState: { errors }} = useForm({ resolver: yupResolver(ProfileSchema) })

	const handleUserProfileData = (data: any) => {
		setValue('firstName', data.firstName)
		setValue('lastName', data.lastName)
		setValue('email', data.email)
		setValue('phoneNumber', data.phoneNumber)
	}
	const handleChangeUserProfile = async (data: any) => {
		setIsLoading(true)
		const result = await updateCurrentUser(data)
		if (result) {
			setIsLoading(false)
			setUpdateSuccess(true)
		} else {
			setIsLoading(false)
			setUpdateError(true)
		}
	}

	useEffect(() => {
		if (userProfile) {
			handleUserProfileData(userProfile)
		}
	}, [userProfile])


	if (!userProfile) {
		return <Loading/>
	}

	return (
		<>
			<form onSubmit={handleSubmit((data) => handleChangeUserProfile(data))} >
				<Snackbar
					open={updateError}
					onClose={() => {setUpdateError(false)}}
				>
					<Alert>
						Unknown error, please try again later.
					</Alert>
				</Snackbar>
				<Snackbar
					open={updateSuccess}
					onClose={() => setUpdateSuccess(false)}
					autoHideDuration={2000}
				>
					<Alert>
						Your profile has been updated!
					</Alert>
				</Snackbar>
				<Stack alignItems='start' spacing={3} sx={{width: isMobile ? '100%' : '35%'}}>
					<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>Informations</Typography>
					<Box display='flex' flexDirection='row' width='100%'>
						<Controller
							render={({ field }) => (
								<TextField
									label='Fist Name'
									fullWidth
									sx={{marginRight: '10px'}}
									error={!!errors.firstName}
									helperText={errors.firstName?.message as string}
									{...field}
								/>
							)}
							name='firstName'
							control={control}
							defaultValue={userProfile?.firstName}
						/>
						<Controller
							render={({ field }) => (
								<TextField
									label='Last Name'
									fullWidth
									error={!!errors.lastName}
									helperText={errors.lastName?.message as string}
									{...field}
								/>
							)}
							name='lastName'
							control={control}
							defaultValue={userProfile?.lastName}
						/>
					</Box>
					<Controller
						render={({ field }) => (
							<TextField
								label='Email'
								type='email'
								fullWidth
								error={!!errors.email}
								helperText={errors.email?.message as string}
								{...field}
							/>
						)}
						name='email'
						control={control}
						defaultValue={userProfile?.email}
					/>
					<Controller
						render={({ field }) => (
							<TextField
								label='Phone Number'
								fullWidth
								error={!!errors.phoneNumber}
								helperText={errors.phoneNumber?.message as string}
								{...field}
							/>
						)}
						name='phoneNumber'
						control={control}
						defaultValue={userProfile?.phoneNumber}
					/>
					<Button type='submit' variant='contained' disabled={isLoading} sx={{height: 45, width: '100%'}}>
						{ isLoading ? <CircularProgress size={25} /> : 'Update Profile' }
					</Button>

				</Stack>
			</form>
		</>

	)
}

export default ProfileSection
