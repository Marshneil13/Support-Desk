const express = require('express')
const router = express.Router({mergeParams: true})// to merger with the ticket route
const {getNotes, addNote} = require('../controller/noteController')

const { protect } = require("../middleware/authMiddleware");

router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router