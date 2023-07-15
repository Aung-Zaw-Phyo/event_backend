const { validationResult } = require("express-validator")

exports.signup = (req, res, next) => {
    
    res.send('signup')
}

exports.login = (req, res, next) => {
    res.send('login')
}

exports.logout = (req, res, next) => {
    res.send('logout')
}