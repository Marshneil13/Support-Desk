const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @desc Get user tickets
// @route GET /api/tickets
// @access Private (whether we need some token to authenticate)
const getTickets = asyncHandler(async (req, res) => {

    res.status(200).json({message: 'get tickets'})
    //this req.user is from line 20 in authMiddleware.js
})


// @desc Create new ticket
// @route POST /api/tickets
// @access Private (whether we need some token to authenticate)
const createTicket = asyncHandler(async (req, res) => {

    res.status(200).json({message: 'create ticket'})
    //this req.user is from line 20 in authMiddleware.js
})

module.exports = {
    getTickets,
    createTicket,
}