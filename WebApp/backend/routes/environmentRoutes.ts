const express = require('express')
const router = express.Router()
const { getStatisticsByEnvironment, getEnvironment, updateEnvironment } = require('../controllers/environmentController')
const { getLogs } = require('../controllers/logsController')

router.get('/', getEnvironment)

router.get('/statistics', getStatisticsByEnvironment)

router.get('/history', getLogs)

router.patch('/', updateEnvironment)

export default router
