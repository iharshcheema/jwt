const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const secret = process.env.SECRET

// Register user
const register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body

    // Hash the password
    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(password, salt)

    // Create user in database
    const newUser = await User.create({
      email,
      username,
      password: hashedPass,
    })

    res.status(201).json({
      success: true,
      message: `User: ${newUser.username} has been created`,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
}

// Login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find the user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User does not exist with the current email',
      })
    }

    // Compare the password
    const passCompare = await bcrypt.compare(password, user.password)

    // If the password does not match
    if (!passCompare) {
      return res.status(403).json({
        success: false,
        error: 'Incorrect password',
      })
    }

    // If the password matches, send JWT
    const token = jwt.sign({ id: user._id }, secret, {}, (err, token) => {
      if (err) {
        throw err
      }
      res.status(200).json({
        token,
      })
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
}

module.exports = { register, login }
