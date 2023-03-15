import { FC } from 'react'

import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'


export interface ListViewCol extends GridColDef {
    groups?: string[]
    isInternal?: boolean
	renderCell?: (params: GridRenderCellParams) => React.ReactNode
}


interface ListViewI {
    columns: ListViewCol[]
	rows: any[]
}

const ListView: FC<ListViewI> = ({rows, columns}) => {

	return (
		<Box sx={{ height: '100%', width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				disableSelectionOnClick
				hideFooter
			/>
		</Box>

	)
}

export default ListView
