const express = require('express')
const { register, login } = require('../controllers/auth')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'WELCOME to the api',
  })
})
router.post('/auth/register', register)

router.post('/auth/login', login)

module.exports = router
