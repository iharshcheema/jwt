const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, min: 2, max: 50 },
    password: { type: String, required: true, min: 5 },
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
