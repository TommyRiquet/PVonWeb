const express = require('express')
const router = express.Router()
const { getTeamMembersByEnvironment, addUser, kickUserFromEnvironment, editUserRole } = require('../controllers/teamController')

router.get('/members', getTeamMembersByEnvironment)
router.post('/', addUser)
router.delete('/:id', kickUserFromEnvironment)
router.put('/:id', editUserRole)

export default router
