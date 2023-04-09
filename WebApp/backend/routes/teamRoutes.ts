const express = require('express')
const router = express.Router()
const { getTeamMembersByEnvironment } = require('../controllers/teamController')

router.get('/members', getTeamMembersByEnvironment)


export default router
