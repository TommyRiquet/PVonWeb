import Error from './app/views/Error/Error'
import DashboardView from './app/views/Dashboard/DashboardView'
import TeamView from './app/views/Team/TeamView'
import TranscriptView from './app/views/Transcript/TranscriptView'
import SettingsView from './app/views/Settings/SettingsView'
import ProfilView from './app/views/Profil/ProfilView'


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
		path: '/team',
		view: <TeamView/>,
		exact: true
	},
	{
		path: '/transcript',
		view: <TranscriptView/>,
		exact: true
	},
	{
		path: '/profil',
		view: <ProfilView/>,
		exact: true
	},
	{
		path: '/settings',
		view: <SettingsView/>,
		exact: true
	},
	{
		path: '*',
		view: <Error/>,
		exact: true
	}
]

export { AppRoutes }
