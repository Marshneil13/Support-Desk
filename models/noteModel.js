// This is going to be a schema, including all the fields we want for the ticket
const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
    {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ticket'//tells which ticket the note is related to
    },
    text:{
        type: String,
        required: [true, 'Please add some text']
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String
    },
},
{
 timestamps:true   
})

module.exports = mongoose.model('Note', noteSchema)