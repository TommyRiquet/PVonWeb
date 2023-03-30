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
		/>

	)
}

export default ListView
