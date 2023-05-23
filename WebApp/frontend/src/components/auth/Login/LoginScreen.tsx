import { useState } from 'react'

import { Box, Typography, TextField, Button, Container, Stack, Paper, Snackbar, Alert, Link} from '@mui/material'

import { PasswordTextField } from 'components/common'
import { useAuth } from 'contexts/AuthContext'

import logo from 'static/images/PVWlogo512.png'

import theme from 'theme'


function LoginScreen() {
	const { login } = useAuth()
	const [errorMessage, setErrorMessage] = useState('')

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
					alignItems: 'center'
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
						<Box width='100%' display='flex' flexDirection='column' alignItems='center' justifyContent='space-between' marginBottom={1}>
							<img src={logo} alt='logo' style={{ width: '10vh'}}/>
						</Box>
						<Stack height='100%' width='100%' justifyContent='center' alignItems='center' spacing={3}>
							<Paper elevation={0} sx={{height: 70, width: '100%'}}>
								<TextField
									label='Email'
									variant='outlined'
									sx={{ marginTop: '10px', width: '100%' }}
									id='email'
								/>
							</Paper>
							<Paper elevation={0} sx={{height: 80, width: '100%'}}>
								<PasswordTextField
									label='Password'
									variant='outlined'
									id='password'
								/>
								<Typography variant='body2' fontWeight='bold' marginTop={2} textAlign='end' sx={{color: theme.palette.primary.main}}>
									<Link href='_blank' rel='noreferrer' underline='none'>
										Forgot your password ?
									</Link>
								</Typography>
							</Paper>
							<Paper elevation={0} sx={{width: '100%'}}>
								<Stack justifyContent='right' alignItems='left' spacing={1}>
									<Button type='submit' sx={{height: 45}} fullWidth variant='contained'>
										<Typography variant='body1' fontWeight='bold'>Login</Typography>
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
