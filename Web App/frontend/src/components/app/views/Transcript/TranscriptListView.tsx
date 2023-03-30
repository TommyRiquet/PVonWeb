import { Box, Button, TextField } from '@mui/material'
import { ListView } from 'components/common'


const columns = [
	{
		field: 'id',
		headerName: 'ID',
		hideable: false,
		width: 80
	},
	{
		field: 'name',
		headerName: 'Name',
		hideable: false,
		flex: 1
	},
	{
		field: 'date',
		headerName: 'Date',
		hideable: false,
		flex: 1
	},
	{
		field: 'admin',
		headerName: 'Admin',
		hideable: false,
		flex: 1
	}
]

const rows = [
	{
		id: 1,
		name: 'PV 1',
		date: '2021-01-01',
		admin: 'Admin 1'
	},
	{
		id: 2,
		name: 'PV 2',
		date: '2021-01-01',
		admin: 'Admin 1'
	},
	{
		id: 3,
		name: 'PV 3',
		date: '2021-01-01',
		admin: 'Admin 1'
	},
	{
		id: 4,
		name: 'PV 4',
		date: '2021-01-01',
		admin: 'Admin 1'
	},
	{
		id: 5,
		name: 'PV 5',
		date: '2021-01-01',
		admin: 'Admin 1'
	},
	{
		id: 6,
		name: 'PV 6',
		date: '2021-01-01',
		admin: 'Admin 1'
	}
]


const TranscriptListView: React.FC = () => {

	return (
		<Box display='flex' flexDirection='column' alignItems='stretch' paddingX={5}>
			<Box display='flex' justifyContent='space-between' paddingY={3}>
				<Box>
					<TextField label='Search' size='small'/>
				</Box>
				<Box>
					<Button variant='contained' color='primary' onClick={() => console.log('/transcript/create')}>Create</Button>
				</Box>
			</Box>

			<ListView columns={columns} rows={rows}/>
		</Box>
	)
}

export default TranscriptListView