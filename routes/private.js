const express = require('express')
const {getPrivateData, getAllUser} = require('../controllers/private')
const {protect} = require('../middleware/auth')
const router = new express.Router()

router.route('/').get(protect, getPrivateData)
router.route('/users').get(protect, getAllUser)

module.exports = router 