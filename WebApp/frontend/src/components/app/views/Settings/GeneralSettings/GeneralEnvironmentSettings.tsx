import { FC, useState, useEffect } from 'react'

import { Button, Box, TextField, Snackbar, Alert, Typography, CircularProgress } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Loading } from 'components/common'

import useCurrentUser from 'hooks/useCurrentUser'

import { useEnvironmentAPI } from 'services/environment.services'


const EnvironmentSchema = yup.object().shape({
	name: yup.string().required('This field is required').max(40, 'Environment\'s Name must be at most 40 characters')
})

const GeneralEnvironmentSettings: FC = () => {

	const [updateError, setUpdateError] = useState(false)
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { userProfile } = useCurrentUser()
	const { getEnvironment, updateEnvironment } = useEnvironmentAPI()

	const { handleSubmit, setValue, control, formState: { errors }} = useForm({ resolver: yupResolver(EnvironmentSchema) })

	const handleChangeEnvName = async (data: any) => {
		setIsLoading(true)
		const result = await updateEnvironment(data)
		if (result) {
			setIsLoading(false)
			setUpdateSuccess(true)
		} else {
			setIsLoading(false)
			setUpdateError(true)
		}
	}

	useEffect(() => {
		getEnvironment().then(res => {
			if (res) {
				setValue('name', res.name)
			}
		})
	}, [])


	if (!userProfile) {
		return <Loading/>
	}

	return (
		<>
			<form onSubmit={handleSubmit((data) => handleChangeEnvName(data))} style={{width: '100%'}} >
				<Snackbar
					open={updateError}
					onClose={() => {setUpdateError(false)}}
				>
					<Alert>
						Unknown error, please try again .
					</Alert>
				</Snackbar>
				<Snackbar
					open={updateSuccess}
					onClose={() => setUpdateSuccess(false)}
					autoHideDuration={2000}
				>
					<Alert>
						Your environment has been updated.
					</Alert>
				</Snackbar>
				<Box display='flex' flexDirection='column' width='100%' padding={2}>
					<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>Environment</Typography>
					<Controller
						render={({ field }) => (
							<TextField
								label='Environment name'
								fullWidth
								error={!!errors.name}
								helperText={errors.name?.message as string}
								disabled={ userProfile?.role !== 'admin'}
								sx={{ marginY: 2 }}
								{...field}
							/>
						)}
						name='name'
						control={control}
						defaultValue={''}
					/>
					<Button type='submit' variant='contained' disabled={isLoading} sx={{height: 45, width: '100%'}}>
						{ isLoading ? <CircularProgress size={25} /> : 'Update' }
					</Button>
				</Box>
			</form>
		</>

	)
}

export default GeneralEnvironmentSettings
