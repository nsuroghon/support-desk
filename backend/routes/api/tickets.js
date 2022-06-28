const router = require('express').Router();
const ticketsController = require('../../controllers/ticketsController')
const {protect} = require('../../middleware/authMiddleware')

router.route('/')
    .get(protect, ticketsController.getTickets)
    .post(protect, ticketsController.createTicket)

module.exports = router