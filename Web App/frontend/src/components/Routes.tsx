import Error from './app/views/Error/Error'
import DashboardView from './app/views/Dashboard/DashboardView'
import TeamView from './app/views/Team/TeamView'

export interface MenuRoute {
    menuKey: string
    text: string
    icon: JSX.Element
    position: number
}

export interface AppRoute {
    path: string
    view: JSX.Element
    menu?: MenuRoute
}

const AppRoutes = [
	{
		path: '/dashboard',
		view: <DashboardView/>,
		exact: true
	},
	{
		path: '/teams',
		view: <TeamView/>,
		exact: true
	},
	{
		path: '*',
		view: <Error/>,
		exact: true
	},
]

export { AppRoutes }
