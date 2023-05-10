const express = require('express')
const router = express.Router()
const { getTranscriptByEnvironment, getTranscriptById, updateTranscript } = require('../controllers/transcriptController')
const { getTagsByEnvironment, createTag, updateTag, deleteTag } = require('../controllers/tagController')


router.get('/', getTranscriptByEnvironment)

router.get('/tag', getTagsByEnvironment)
router.post('/tag', createTag)
router.patch('/tag/:id', updateTag)
router.delete('/tag/:id', deleteTag)

router.get('/:id', getTranscriptById)
router.patch('/:id', updateTranscript)


export default router
