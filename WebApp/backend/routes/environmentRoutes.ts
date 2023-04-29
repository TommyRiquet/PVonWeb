const express = require('express')
const router = express.Router()
const { getStatisticsByEnvironment } = require('../controllers/environmentController')

router.get('/statistics', getStatisticsByEnvironment)


export default router
