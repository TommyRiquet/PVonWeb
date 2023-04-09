const express = require('express')
const router = express.Router()
const { getTranscriptByEnvironment, getTranscriptById } = require('../controllers/transcriptController')

router.get('/', getTranscriptByEnvironment)
router.get('/:id', getTranscriptById)


export default router
