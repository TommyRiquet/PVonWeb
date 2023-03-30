import React from 'react'

import { Box, Typography, TextField, Button, Container, Stack, Paper, Snackbar, Alert} from '@mui/material'

import { PasswordTextField } from 'components/common'
import { useAuth } from 'contexts/AuthContext'

import theme from 'theme'


function LoginScreen() {
	const { login } = useAuth()
	const [errorMessage, setErrorMessage] = React.useState('')

	function handleSubmit(event: any) {
		event.preventDefault()
		login(
			event.target.email.value,
			event.target.password.value,
			() => {
				//window.location.reload()
			},
			() => {
				setErrorMessage('Wrong Credentials')
			}
		)
	}

	return (
		<Box
			sx={{
				background: 'linear-gradient(to left top, #347571, #449342);',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden'
			}}>
			<Snackbar
				open={errorMessage.length > 0}
				onClose={() => {setErrorMessage('')}}
			>
				<Alert onClose={() => {setErrorMessage('')}} severity='error'>
					{errorMessage}
				</Alert>
			</Snackbar>
			<Container
				maxWidth='sm'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<form onSubmit={handleSubmit} style={{ width: '100%' }}>
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						flexDirection='column'
						marginBottom='10vh'
						padding='20px'
						borderRadius='10px'
						sx={{ backgroundColor: theme.palette.secondary.main }}
					>
						<Typography p={'10px 0'} variant='h3'>Login</Typography>
						<Stack height='100%' width='100%' justifyContent='center' alignItems='center' spacing={3}>
							<Paper elevation={0} sx={{height: 70, width: '100%'}}>
								<TextField
									label='Email'
									variant='outlined'
									sx={{ marginTop: '10px', width: '100%' }}
									id='email'
								/>
							</Paper>
							<Paper elevation={0} sx={{height: 70, width: '100%'}}>
								<PasswordTextField
									label='Mot de passe'
									variant='outlined'
									id='password'
								/>
							</Paper>
							<Paper elevation={0} sx={{width: '100%'}}>
								<Stack justifyContent='right' alignItems='left' spacing={1}>
									<Button type='submit' sx={{height: 45}} fullWidth variant='contained'>
										Login
									</Button>
								</Stack>
							</Paper>
						</Stack>
					</Box>
				</form>
			</Container>
		</Box>
	)
}

export default LoginScreen
