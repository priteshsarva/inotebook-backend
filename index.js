const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
require('dotenv').config()


connectToMongo();
const app = express()
const port = process.env.port || 5000
app.use(cors())

app.use(express.json())


app.use('/api/user/auth/',require('./routes/auth'))
app.use('/api/notes/',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send("hello")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})