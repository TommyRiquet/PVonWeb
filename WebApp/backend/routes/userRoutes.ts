const express = require('express')
const router = express.Router()
const { getUser, updateUser, changePassword } = require('../controllers/userController')

router.get('/', getUser)
router.patch('/', updateUser)
router.patch('/password', changePassword)

export default router
