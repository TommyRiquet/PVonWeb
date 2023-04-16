const express = require('express')
const router = express.Router()
const { login, verify } = require('../controllers/authController')

router.post('/login', login)
router.post('/verify', verify)

export default router
