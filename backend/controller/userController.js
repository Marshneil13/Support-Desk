const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

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

    //Find if user already exists
    const userExists = await User.findOne({email})
    // same as .findOne({email: email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    //genSalt(rounds? : number) default is 10
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            //mongoDB stores ids as _id
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new error('Invalid user data')
    }
})


// @desc Login an existing user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    //compare plain text password with the hashed password using bcrypt function compare
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(401)
        throw new Error('Invalid credentials')
    }
    console.log(res.json)
})

// @desc Get Current user
// @route /api/users/me
// @access Private (whether we need some token to authenticate)
// the aim to register a user is to get that token to be used further hence it is public


const getMe = asyncHandler(async (req, res) => {

    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user)
    //this req.user is from line 20 in authMiddleware.js
})

//Generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}