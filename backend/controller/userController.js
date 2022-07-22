const asyncHandler = require('express-async-handler')

// @desc Register a new user
// @route /api/users
// @access Public (whether we need some token to authenticate)
// the aim to register a user is to get that token to be used further hence it is public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    //data is stored in the req.body
    // req.body will be undefined so we need to set a body parser middleware

    //Validation
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }

    res.send('Register Route')
})

// @desc Login an existing user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login Route')
})

module.exports = {
    registerUser,
    loginUser,
}