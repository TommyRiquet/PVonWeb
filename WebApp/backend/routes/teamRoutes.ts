const express = require('express')
const router = express.Router()
const { getTeamMembersByEnvironment, addUser, kickUserFromEnvironment } = require('../controllers/teamController')

router.get('/members', getTeamMembersByEnvironment)
router.post('/', addUser)
router.delete('/:id', kickUserFromEnvironment)

export default router
