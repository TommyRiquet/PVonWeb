const express = require('express')
const router = express.Router()

const { getMedia } = require('../controllers/mediaController')

router.get('/:id', getMedia)

export default router
