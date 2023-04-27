const express = require('express')
const router = express.Router()
const { getUser, updateUser, changePassword, addUser } = require('../controllers/userController')


router.get('/', getUser)
router.patch('/', updateUser)
router.post('/', addUser)
router.patch('/password', changePassword)

export default router
