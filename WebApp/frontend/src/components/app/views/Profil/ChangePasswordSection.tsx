import { FC, useState, useEffect } from 'react'

import { Button, TextField, Stack, Snackbar, Alert, Typography, CircularProgress } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import useCurrentUser from 'hooks/useCurrentUser'

import { Loading } from 'components/common'

const ProfileSchema = yup.object().shape({
	oldPassword: yup.string().required('This field is required'),
	newPassword1: yup.string().required('This field is required'),
	newPassword2: yup.string().required('This field is required')
})

const ChangePasswordSection: FC = () => {

	const [updateError, setUpdateError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { userProfile, changePassword } = useCurrentUser()

	const { handleSubmit, setValue, control, formState: { errors }} = useForm({ resolver: yupResolver(ProfileSchema) })

	const handleUserProfileData = (data: any) => {
		setValue('oldPassword', data.oldPassword)
		setValue('newPassword1', data.newPassword1)
		setValue('newPassword2', data.newPassword2)
	}
	const handleChangeUserProfile = async (data: any) => {
		setIsLoading(true)
		const result = await changePassword(data.oldPassword, data.newPassword1, data.newPassword2)
		if (result.status === 200) {
			setIsLoading(false)
			setUpdateSuccess(true)
		} else {
			setIsLoading(false)
			setUpdateError(true)
			setErrorMessage(result.message)
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
					autoHideDuration={2000}
				>
					<Alert severity='error'>
						{errorMessage}
					</Alert>
				</Snackbar>
				<Snackbar
					open={updateSuccess}
					onClose={() => setUpdateSuccess(false)}
					autoHideDuration={2000}
				>
					<Alert>
						Your password has been updated!
					</Alert>
				</Snackbar>
				<Stack alignItems='start' spacing={3} sx={{width: '35%', minWidth: '350px'}}>
					<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>Change Password</Typography>
					<Controller
						render={({ field }) => (
							<TextField
								label='Old Password'
								fullWidth
								sx={{marginRight: '10px'}}
								error={!!errors.oldPassword}
								helperText={errors.oldPassword?.message as string}
								type='password'
								{...field}
							/>
						)}
						name='oldPassword'
						control={control}
					/>
					<Controller
						render={({ field }) => (
							<TextField
								label='New Password'
								fullWidth
								error={!!errors.newPassword1}
								helperText={errors.newPassword1?.message as string}
								type='password'
								{...field}
							/>
						)}
						name='newPassword1'
						control={control}
					/>
					<Controller
						render={({ field }) => (
							<TextField
								label='Confirm New Password'
								fullWidth
								error={!!errors.newPassword2}
								helperText={errors.newPassword2?.message as string}
								type='password'
								{...field}
							/>
						)}
						name='newPassword2'
						control={control}
					/>
					<Button type='submit' variant='contained' disabled={isLoading} sx={{height: 45, width: '100%'}}>
						{ isLoading ? <CircularProgress size={25} /> : 'Change Password' }
					</Button>

				</Stack>
			</form>
		</>

	)
}

export default ChangePasswordSection
