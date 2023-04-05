import { FC } from 'react'

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'


export interface ListViewCol extends GridColDef {
	renderCell?: (params: GridRenderCellParams) => React.ReactNode
}


interface ListViewI {
    columns: ListViewCol[]
	rows: any[]
}


const ListView: FC<ListViewI> = ({rows, columns}) => {

	return (
		<DataGrid
			autoHeight
			rows={rows}
			columns={columns}
			disableSelectionOnClick
			hideFooter
			disableColumnMenu
			sx={{
				border: '0px solid #000000',
				color: theme => theme.palette.primary.main,
				'& .MuiDataGrid-row': {
					cursor: 'pointer',
				},
				'& .MuiDataGrid-columnHeader': {
					border: '0px solid transparent',
				},
				'& .MuiDataGrid-columnSeparator': {
					display: 'none',
				},
				'& .MuiDataGrid-columnHeaderTitle': {
					fontWeight: 'bold',
				}
			}}
		/>

	)
}

export default ListView
