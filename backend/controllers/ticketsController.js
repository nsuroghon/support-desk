const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const db = require('../models')

module.exports = {
    // @desc Get user ticket
    // @route GET /api/tickets
    // @access Private
    getTickets: asyncHandler( async(req,res) => {
        res.status(200).json({message: 'getTickets'})
    }),
    // @desc Create new ticket
    // @route POST /api/tickets
    // @access Private
    createTicket: asyncHandler( async(req,res) => {
        res.status(200).json({message: 'createTicket'})
    })
}