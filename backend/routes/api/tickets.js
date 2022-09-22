const router = require('express').Router();
const ticketsController = require('../../controllers/ticketsController')
const {protect} = require('../../middleware/authMiddleware')

router.route('/')
    .get(protect, ticketsController.getTickets, ticketsController.getTicket )
    .post(protect, ticketsController.createTicket)

router.route('/:id')
    .get(protect, ticketsController.getTicket)

module.exports = router