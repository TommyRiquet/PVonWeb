import { useTranslation } from 'react-i18next'

import { Box, Typography, Button } from '@mui/material'

const Error = () =>  {

	const { t } = useTranslation()

	return (
		<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%'>
			<Typography variant='h1' sx={{textAlign: 'center'}}>404</Typography>
			<Typography variant='h2' sx={{textAlign: 'center'}}>{t('Page not found')}</Typography>
			<Typography variant='body1' sx={{marginTop: 2, textAlign: 'center'}}>{t('It seems like you are trying to access a page that does not exist.')}</Typography>
			<Button variant='contained' color='primary' href='/' sx={{marginTop: 2}}>{t('Go back to dashboard')}</Button>
		</Box>
	)
}

export default Error
