const express = require('express')
const router = express.Router()
const { getStatisticsByEnvironment, getEnvironments, updateEnvironment } = require('../controllers/environmentController')
const { getLogs } = require('../controllers/logsController')

router.get('/', getEnvironments)

router.get('/statistics', getStatisticsByEnvironment)

router.get('/history', getLogs)

router.patch('/', updateEnvironment)

export default router
