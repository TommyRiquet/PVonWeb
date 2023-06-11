const express = require('express')
const router = express.Router()
const { getStatisticsByEnvironment, getEnvironments, updateEnvironment } = require('../controllers/environmentController')
const { getLogs, deleteLog } = require('../controllers/logsController')

router.get('/', getEnvironments)

router.get('/statistics', getStatisticsByEnvironment)

router.get('/history', getLogs)
router.delete('/history/:id', deleteLog)

router.patch('/', updateEnvironment)

export default router
