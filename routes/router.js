const express = require ('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middileware/jwtMiddleware')

const router = new express.Router()

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// all-users
router.get('/all-users',jwtMiddleware,userController.allUserController)

// one-users
router.get('/one-user',jwtMiddleware,userController.oneUserController)

module.exports = router