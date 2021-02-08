const express = require('express')
const {register, login, forgotpassword, resetpassword, logout} = require('../controllers/auth')
const auth = require('../middleware/auth')
const router = new express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgotpassword').post(forgotpassword)
router.route('/resetpassword/:resetToken').put(resetpassword)
router.route('/logout').post(logout)

module.exports = router