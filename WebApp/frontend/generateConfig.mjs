import fs from 'fs'
import path from 'path'

const generateConfig = () => {

	console.log('Generating config.js...')

	const routes = {
		'--dev': 'http://localhost:3001/api/',
		'--test': 'http://localhost:3001/api/',
		'--prod': 'https://pvonweb.be/api/',
		'--staging': 'https://pvonweb.be/api/'
	}

	const config = {
		// eslint-disable-next-line no-undef
		API_URL: routes[process.argv[2]]
	}

	const filePath = path.resolve('src', 'config.json')
	const fileContents = JSON.stringify(config, null, 2)

	fs.writeFileSync(filePath, fileContents)

}

generateConfig()
