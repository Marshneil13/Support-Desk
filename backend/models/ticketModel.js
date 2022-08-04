// This is going to be a schema, including all the fields we want for the ticket
const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
    {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product:{
        type: String,
        required: [true, 'Please select a product'],
        enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad', 'Android', 'Laptop'] 
    },
    description:{
        type: String,
        required: [true, 'Please describe your issue']
    },
    status:{
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new',
    }
},
{
 timestamps:true   
})

module.exports = mongoose.model('Ticket', ticketSchema)