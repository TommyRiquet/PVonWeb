import fs from 'fs'
import path from 'path'

const generateConfig = () => {

	console.log('Generating config.js...')

	const routes = {
		'--dev': 'http://localhost:3001/api/',
		'--test': 'http://localhost:3001/api/',
		'--prod': 'http://ec2-15-236-208-84.eu-west-3.compute.amazonaws.com/api/',
		'--staging': 'http://ec2-15-236-208-84.eu-west-3.compute.amazonaws.com/api/'
	}

	const config = {
		API_URL: routes[process.argv[2]]
	}

	const filePath = path.resolve('src', 'config.json')
	const fileContents = JSON.stringify(config, null, 2)

	fs.writeFileSync(filePath, fileContents)

}

generateConfig()
