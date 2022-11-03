const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const db = require('../models')

module.exports = {
    // @desc Get notes for a ticket
    // @route GET /api/tickets/:ticketId/notes
    // @access Private
    getNotes: asyncHandler( async(req,res) => {
        const user = await db.User.findById(req.user.id)

        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await db.Ticket.findById(req.params.ticketId)

        if(ticket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }

        const notes = await db.Note.find({ticket: req.params.ticketId})

        res.status(200).json(notes)
    }),
    
    // @desc Create ticket note
    // @route POST /api/tickets/:ticketId/notes
    // @access Private
    addNote: asyncHandler( async(req,res) => {
        const user = await db.User.findById(req.user.id)

        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await db.Ticket.findById(req.params.ticketId)

        if(ticket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }

        const note = await db.Note.create({
            text: req.body.text,
            isStaff: false,
            ticket: req.params.ticketId,
            user: req.user.id
        })

        res.status(200).json(note)
    }),

}