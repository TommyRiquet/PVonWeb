import { Box } from '@mui/material'
import { Responsive, WidthProvider } from 'react-grid-layout'

import { HistoryWidget, TranscriptWidget, TeamWidget, StatisticsWidget } from 'components/app/widgets'
import { Widget } from 'components/common'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const WidgetsList = {
	'HistoryWidget': <Widget title={'History'}><HistoryWidget/></Widget>,
	'TranscriptWidget': <Widget title={'Trancripts'}><TranscriptWidget/></Widget>,
	'TeamsWidget': <Widget title={'Team'}><TeamWidget/></Widget>,
	'StatisticsWidget': <Widget title={'Statistics'}><StatisticsWidget/></Widget>
}

const defaultLayout = [
	{ i: WidgetsList.HistoryWidget, x: 0, y: 0, w: 4, h: 5 },
	{ i: WidgetsList.TranscriptWidget, x: 4, y: 0, w: 4, h: 5 },
	{ i: WidgetsList.TeamsWidget, x: 8, y: 0, w: 4, h: 2.5 },
	{ i: WidgetsList.StatisticsWidget, x: 8, y: 4, w: 4, h: 2.5 }
]


const DashboardView = () => {
	const ResponsiveReactGridLayout = WidthProvider(Responsive)
	const widgetArray = defaultLayout

	return (
		<Box flexGrow={1} padding={2}>
			<ResponsiveReactGridLayout
				verticalCompact={true}
				preventCollision={false}
				autoSize={true}
				margin={{
					lg: [20, 20],
					md: [20, 20],
					sm: [20, 20],
					xs: [20, 20],
					xxs: [20, 20]
				}}
				style={{
					height: '100%'
				}}
			>
				{widgetArray?.map((widget, index) => {
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
								minW: 4,
								maxW: 4,
								minH: 2.5,
								maxH: 5,
								minX: 0,
								maxX: 8,
								minY: 0,
								maxY: 8,
								isDraggable: false,
								isResizable: false,
								isBounded: true
							}}
						>
							{widget.i}
						</Box>)})}
			</ResponsiveReactGridLayout>
		</Box>
	)
}

export default DashboardView
