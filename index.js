const express = require('express')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const mongoURL = process.env.MONGO_URL
const routes = require('./routes/routes')

// configurations
app.use(
  helmet({
    crossOriginResourcePolicy: true,
  })
)
// body-parser
app.use(bodyParser.json({ limit: '30mb', extended: true }))

// cors
app.use(cors())

// routes
app.use(routes)

// mongoose setup
mongoose
  .connect(mongoURL)
  .then(() => console.log('MongoDB connected'))
  .then(() =>
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  )
  .catch((err) => console.error('MongoDB connection error:', err))
