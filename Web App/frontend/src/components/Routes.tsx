import Error from './app/views/Error/Error'
import Dashboard from './app/views/Dashboard/Dashboard'

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
		view: <Dashboard/>,
		exact: true
	},
	{
		path: '*',
		view: <Error/>,
		exact: true
	},
]

export { AppRoutes }
