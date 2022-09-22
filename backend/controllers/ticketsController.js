const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const db = require('../models')

module.exports = {
    // @desc Get user ticket
    // @route GET /api/tickets
    // @access Private
    getTickets: asyncHandler( async(req,res) => {
        const user = await db.User.findById(req.user.id)

        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        const tickets = await db.Ticket.find({user: req.user.id})

        res.status(200).json(tickets)
    }),

    // @desc Get single ticket
    // @route GET /api/tickets/:id
    // @access Private
    getTicket: asyncHandler( async(req,res) => {
        const user = await db.User.findById(req.user.id)

        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await db.Ticket.findById(req.params.id)

        if(!ticket){
            res.status(404)
            throw new Error('Ticket Not found')
        }

        if(ticket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not Authorized')
        }


        res.status(200).json(ticket)
    }),

    // @desc Create new ticket
    // @route POST /api/tickets
    // @access Private
    createTicket: asyncHandler( async(req,res) => {
        const {product, description} = req.body

        if(!product || !description) {
            res.status(400)
            throw new Error('Please add a product and description')
        }

        const user = await db.User.findById(req.user.id)

        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await db.Ticket.create({
            product,
            description,
            user: req.user.id,
            status: 'new'
        })

        res.status(201).json(ticket)
    }),

    // @desc Delete ticket
    // @route DELETE /api/tickets/:id
    // @access Private
    deleteTicket: asyncHandler( async(req,res) => {
        const user = await db.User.findById(req.user.id)

        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await db.Ticket.findById(req.params.id)

        if(!ticket){
            res.status(404)
            throw new Error('Ticket Not found')
        }

        if(ticket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not Authorized')
        }

        await db.Ticket.remove()


        res.status(200).json({ succes: true })
    }),

    // @desc update ticket
    // @route PUT /api/tickets/:id
    // @access Private
    updateTicket: asyncHandler( async(req,res) => {
        const user = await db.User.findById(req.user.id)

        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await db.Ticket.findById(req.params.id)

        if(!ticket){
            res.status(404)
            throw new Error('Ticket Not found')
        }

        if(ticket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not Authorized')
        }

        const updatedTicket = await db.Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json(updatedTicket)
    }),
}