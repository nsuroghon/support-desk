const router = require('express').Router();
const usersController = require('../../controllers/usersController')

router.route('/')
    .get(usersController.findAllUsers)
    .post(usersController.registerUser)

router.route('/login')
    .post(usersController.loginUser)
// router.post('/', (req,res) => {
//     res.send('register route')
// })

// router.post('/login', (req,res) => {
//     res.send('login route')
// })

module.exports = router