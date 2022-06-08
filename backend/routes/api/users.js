const router = require('express').Router();
const usersController = require('../../controllers/usersController')
const {protect} = require('../../middleware/authMiddleware')

router.route('/')
    .get(usersController.findAllUsers)
    .post(usersController.registerUser)

router.route('/login')
    .post(usersController.loginUser)

router.route('/me')
    .get(protect, usersController.getMe)

module.exports = router