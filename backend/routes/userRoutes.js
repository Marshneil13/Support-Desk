const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe} = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)
router.get('/me', protect, getMe)
// any route that we ant to protect, we simply put protect as an argument with that route

module.exports = router