import React, { FC, useMemo } from 'react'

import { Grid } from '@mui/material'

import { WidgetHeader } from 'components/common'
import Item from './Item'

interface WidgetInterface {
	children?: React.ReactNode
    title?: string
    isInternal?: boolean
    display?: () => boolean
    headerComponent?: React.ReactNode
    gridProps?: {
        xs?: number
        sm?: number
        md?: number
        lg?: number
        xl?: number
        sx?: any
    }
}


const Widget: FC<WidgetInterface> = ({title, isInternal, display, children, gridProps, headerComponent}) => {


	const isVisible = useMemo(() => {
		if (!!display && !display())
			return false
		return !isInternal
	}, [isInternal])

	if (!isVisible) {
		return null
	}

	return (
		<Grid item {...gridProps}>
			<Item variant='outlined' sx={{height: '100%', borderLeft: '2px solid'}}>
				<WidgetHeader title={title} isInternal={isInternal}>{headerComponent}</WidgetHeader>
				{children}
			</Item>
		</Grid>
	)
}

export default Widget