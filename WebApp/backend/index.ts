const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const { AppDataSource } = require('./config/database')
const { loadDemoData } = require('./utils/demoData')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./doc/api_endpoints.json')

const app = express()

// Middleware
app.use(cors(
	{
		origin: process.env.NODE_ENV === 'production' ? 'https://pvonweb.be' : 'http://localhost:3000',
		credentials: true
	}
))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Routes
import authRouter from './routes/authRoutes'
import transcriptRouter from './routes/transcriptRoutes'
import teamRouter from './routes/teamRoutes'
import userRouter from './routes/userRoutes'
import environmentRouter from './routes/environmentRoutes'

app.use('/api/health', (_, res) => res.send('OK'))
app.use('/api/auth', authRouter)
app.use('/api/transcript', transcriptRouter)
app.use('/api/team', teamRouter)
app.use('/api/user', userRouter)
app.use('/api/environment', environmentRouter)

app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, { customCss: '.try-out__btn { display: none }' }))

app.get('/media/:id', (req, res) => {
	res.sendFile(path.join(__dirname + `/media/${req.params.id}`))
})

app.use(express.static(__dirname + '/build'))
app.get('/*', (_, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'))
})

// Start server
const PORT = process.env.PORT || 3001

AppDataSource.initialize()
	.then(async () => {
		console.log('Connection to the database has been established successfully.')
		await loadDemoData(AppDataSource)
		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}.`)
		})
	})
	.catch((error) => console.log(error))

module.exports = app
