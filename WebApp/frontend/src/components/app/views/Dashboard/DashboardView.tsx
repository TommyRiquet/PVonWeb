import { Box, Typography } from '@mui/material'
import { Responsive, WidthProvider } from 'react-grid-layout'

import { HistoryWidget, TranscriptWidget, TeamWidget, StatisticsWidget } from 'components/app/views/Dashboard/widgets'
import { Widget } from 'components/common'

import { useGlobalContext } from 'contexts/GlobalContext'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const WidgetsList = {
	'HistoryWidget': <Widget title={'History'}><HistoryWidget/></Widget>,
	'TranscriptWidget': <Widget title={'Trancripts'}><TranscriptWidget/></Widget>,
	'TeamsWidget': <Widget title={'Team'}><TeamWidget/></Widget>,
	'StatisticsWidget': <Widget title={'Statistics'}><StatisticsWidget/></Widget>
}

const defaultLayout = [
	{ i: WidgetsList.HistoryWidget, x: 0, y: 0, w: 1, h: 4 },
	{ i: WidgetsList.TranscriptWidget, x: 1, y: 0, w: 1, h: 4 },
	{ i: WidgetsList.TeamsWidget, x: 2, y: 0, w: 1, h: 2 },
	{ i: WidgetsList.StatisticsWidget, x: 2, y: 1, w: 1, h: 2}
]


const DashboardView = () => {

	const { isMobile } = useGlobalContext()
	const ResponsiveReactGridLayout = WidthProvider(Responsive)
	const widgetArray = defaultLayout

	return (
		<Box flexGrow={1} padding={2}>
			<Typography variant='h4' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>Dashboard</Typography>
			<ResponsiveReactGridLayout
				cols={{ lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 }}
			>
				{
					widgetArray?.map((widget, index) => {
						return (
							<Box
								className='reactGridItem'
								key={index}
								data-grid={{
									x: widget?.x,
									y: widget?.y,
									w: widget?.w,
									h: widget?.h,
									i: widget.i,
									minW: 1,
									maxW: 2,
									minH: 1,
									maxH: 2,
									minX: 0,
									maxX: 2,
									minY: 0,
									maxY: 2,
									isDraggable: !isMobile,
									isResizable: false,
									isBounded: true
								}}
							>
								{widget.i}
							</Box>
						)})
				}
			</ResponsiveReactGridLayout>
		</Box>
	)
}

export default DashboardView
