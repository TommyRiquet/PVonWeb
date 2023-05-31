const express = require('express')
const router = express.Router()
const { getTranscriptByEnvironment, getTranscriptById, updateTranscript, createTranscript, getAllOrganization, deleteTranscript } = require('../controllers/transcriptController')
const { getTagsByEnvironment, createTag, updateTag, deleteTag } = require('../controllers/tagController')


router.get('/', getTranscriptByEnvironment)
router.post('/', createTranscript)

router.get('/tag', getTagsByEnvironment)
router.post('/tag', createTag)
router.patch('/tag/:id', updateTag)
router.delete('/tag/:id', deleteTag)

router.get('/organizations', getAllOrganization)

router.get('/:id', getTranscriptById)
router.patch('/:id', updateTranscript)
router.delete('/:id', deleteTranscript)


export default router
