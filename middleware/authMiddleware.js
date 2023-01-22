const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

//Function to protect routes
const protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            //this will split the string from ' ' into an array of 2 elements('Bearer' at 0 and the <token> at 1)
            //this new splitted array will be stored in the variable 'token'

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET )
            //Get user from token
            req.user = await User.findById(decoded.id).select('-password')
            // when we sign a password, we put the user id inside of it
            // the '-password' will the exclude the password that is returned from the data for this user
            next()//to call the next piece of middleware
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
            throw new Error('Not authorized')
    }
})

module.exports = {protect}