const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3001

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// app.get('/', (req,res) => {
//     res.status(200).json({message: 'Welcome to the support desk API'})
// })

const routes = require('./routes')

// Routes
app.use(routes)

// serve front end
if(process.env.NODE_ENV === 'production'){
    // set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
      })
} else {
    app.get('/', (req,res) => {
        res.status(200).json({message: 'Welcome to the support desk API'})
    })
}

// middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`))