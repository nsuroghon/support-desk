const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const db = require('../models')

// When log in or register... call this function --> and get token back
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    // @desc Get all users
    // @route GET /api/users
    // @acess Public
    findAllUsers: asyncHandler(async (req,res) => {
        const data = await db.User.find({ })
        res.status(200).json(data)
    }),

    // @desc Register a new user
    // @route POST /api/users
    // @acess Public
    registerUser: asyncHandler( async (req,res) => {
        const {name, email, password} = req.body

        // Validation
        if(!name || !email || !password) {
            res.status(400)
            throw new Error('Please include all fields')
        }

        // Check if user already exists
        const userExists = await db.User.findOne({email})

        if(userExists) {
            res.status(400)
            throw new Error('User Already Exists')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const user = await db.User.create({ 
            name,
            email,
            password: hashedPassword
        })

        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400)
            throw new error('Invalid user data')
        }
    }),

    // @desc Login a new user
    // @route POST /api/users/login
    // @acess Public
    loginUser: asyncHandler( async(req,res) => {
        const {email, password} = req.body

        const user = await db.User.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(401);
            throw new Error('Invalid credentials');
        }
    }),

    // @desc Get current user
    // @route GET /api/users/me
    // @acess Private
    getMe: asyncHandler( async(req,res) => {
        const user = {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name
        }
        res.status(200).json(user)
    })
};