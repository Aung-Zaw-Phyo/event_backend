const express = require('express')
const router  = express.Router()
const {body} = require('express-validator')
const authController = require('./../controllers/auth')

router.post('/signup', [
    body('name').isLength({min: 3}),
    body('email').isEmail().isLength({min: 12}),
    body('password').isLength({ming: 6})
], authController.signup)

router.post('/login', [
    body('email').isEmail().isLength({min: 12}),
    body('password').isLength({min: 6})
], authController.login)

router.post('/logout', authController.login)


module.exports = router