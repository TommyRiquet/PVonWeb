import { Box, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material'


const data = {
	name: 'Company 1',
	date: '2021-01-01',
	admin: 'Admin 1',
	secretary: 'Secrétary 1',
	scrutineer: 'Scrutineer 1',
	shareHolders: [
		{
			id: 1,
			name: 'Actionnaire 1',
			share: 50
		},
		{
			id: 2,
			name: 'Actionnaire 2',
			share: 50
		}
	]
}


const TranscriptForm: React.FC = () => {



	return (
		<Box>
			<Typography variant='h4'>Transcript</Typography>
			<Typography variant='h5'>{data.name}</Typography>
			<Typography variant='h5'>Date : {data.date}</Typography>
			<Typography variant='h5'>Admin : {data.admin}</Typography>
			<Typography variant='h5'>Secretary : {data.secretary}</Typography>
			<Typography variant='h5'>Scrutineer :{data.scrutineer}</Typography>

			<Typography variant='h5'>List ShareHolders</Typography>
			<FormGroup>
				{
					data.shareHolders.map((shareholder) => {
						return (
							<Box key={shareholder.id}>
								<FormControlLabel control={<Checkbox />} label={shareholder.name} />
							</Box>
						)
					})
				}
			</FormGroup>
		</Box>
	)
}

export default TranscriptForm
