const express = require('express')
const router = express.Router()
const { getTranscriptByEnvironment, getTranscriptById } = require('../controllers/transcriptController')
const { getTagsByEnvironment, createTag } = require('../controllers/tagController')


router.get('/', getTranscriptByEnvironment)

router.get('/tag', getTagsByEnvironment)
router.post('/tag', createTag)

router.get('/:id', getTranscriptById)


export default router
