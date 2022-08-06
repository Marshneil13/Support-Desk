const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel")

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private (whether we need some token to authenticate)
const getNotes = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);
  
  if(ticket.user.toString() !== req.user.id){
      res.status(401)
      throw new Error('User not authorized')
  }

  const notes = await Note.find({ticket: req.params.ticketId})

  res.status(200).json(notes);
  //this req.user is from line 20 in authMiddleware.js
});

// @desc Create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private (whether we need some token to authenticate)
const addNote = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);
  
  if(ticket.user.toString() !== req.user.id){
      res.status(401)
      throw new Error('User not authorized')
  }

  const note = await Note.create({
      text: req.body.text,
      isStaff: false,
      ticket: req.params.ticketId,
      user: req.user.id
    })

  res.status(200).json(note);
  //this req.user is from line 20 in authMiddleware.js
});

module.exports = {
    getNotes,
    addNote,
}