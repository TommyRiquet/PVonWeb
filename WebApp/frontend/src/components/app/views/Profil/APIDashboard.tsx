import { FC } from 'react'

import { useTranslation } from 'react-i18next'
import { Box, CardContent, CardMedia, Typography, CardActionArea, Card } from '@mui/material'

import fastAPI from 'static/images/fastapi.png'

const APIDashboard: FC = () => {

	const { t } = useTranslation()

	return (
		<Box>
			<Card sx={{ maxWidth: 345 }}>
				<CardActionArea>
					<CardMedia
						component='img'
						height='140'
						image={fastAPI}
						sx={{
							objectFit: 'contain',
							padding: 2
						}}
						alt='FastAPILogo'
					/>
					<CardContent>
						<Typography gutterBottom variant='h5' component='div'>
							Fast API
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							{t('Fake API used to simulate a real API')}
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							{t('status')}: <span style={{color: 'green'}}>{t('online')}</span>
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	)
}

export default APIDashboard
