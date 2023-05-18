// create a server
const express = require('express')
const connectDB = require('./config/connectDB')
const cors = require('cors')
const app = express()
const port = 5000;

connectDB()

app.use(cors()) // important middleware

// enable express to read json 
app.use(express.json())
// routes

app.use('/user', require('./routes/user'))



app.listen(port, ()=> console.log(`listen on port ${port}`))