const router = require('express').Router({mergeParams: true});
const notesController = require('../../controllers/notesController')
const {protect} = require('../../middleware/authMiddleware')

router.route('/')
    .get(protect, notesController.getNotes )

module.exports = router