const express = require('express')
const router = express.Router()
const { getStatisticsByEnvironment } = require('../controllers/environmentController')
const { getLogs } = require('../controllers/logsController')

router.get('/statistics', getStatisticsByEnvironment)

router.get('/history', getLogs)

export default router
