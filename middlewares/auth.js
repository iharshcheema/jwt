const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization')
    if (!token) {
      return res.status(403).json({
        success: false,
        msg: 'Access Denied!',
      })
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
    }
    jwt.verify(token, secret, {}, (err, data) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' })
      }
      next()
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
}

module.exports= verifyToken
