const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const db = require('../models')

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
                email: user.email
            })
        }
        else {
            res.status(400)
            throw new error('Invalid user data')
        }
    }),

    // @desc Login a new user
    // @route /api/users/login
    // @acess Public
    loginUser: asyncHandler( async(req,res) => {
        res.send('Login User')
    })
};