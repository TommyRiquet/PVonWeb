import { FC } from 'react'

import { DataGrid, GridColDef, GridRenderCellParams, DataGridProps} from '@mui/x-data-grid'


export interface ListViewCol extends GridColDef {
	renderCell?: (params: GridRenderCellParams) => React.ReactNode
}


interface ListViewI {
    columns: ListViewCol[]
	rows: any[]
}


const ListView: FC<ListViewI & DataGridProps> = ({rows, columns, ...props}) => {

	return (
		<DataGrid
			autoHeight
			rows={rows}
			columns={columns}
			disableSelectionOnClick
			disableColumnMenu
			hideFooter={rows.length < 10}
			pageSize={10}
			sx={{
				border: '0px solid #000000',
				color: theme => theme.palette.primary.main,
				'& .MuiDataGrid-row': {
					cursor: 'pointer'
				},
				'& .MuiDataGrid-columnHeader': {
					border: '0px solid transparent'
				},
				'& .MuiDataGrid-columnSeparator': {
					display: 'none'
				},
				'& .MuiDataGrid-columnHeaderTitle': {
					fontWeight: 'bold'
				},
				'& .MuiDataGrid-cell:focus': {
					outline: 0
				}
			}}
			{...props}
		/>

	)
}

export default ListView
