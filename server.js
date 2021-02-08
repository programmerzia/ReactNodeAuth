require('dotenv').config({path: "./config.env"})
const express = require('express')
const errorHandler = require('./middleware/error')
const auth = require('./middleware/auth')
const port = process.env.PORT || 9000

const app = express()

app.use(express.json())
require('./config/db')


app.use('/api/auth', require('./routes/auth'))
app.use('/api/auth/private', require('./routes/private'))

// Error Handler (Should be last piece of middleware)
app.use(errorHandler)

const server = app.listen(port, ()=>console.log(`server is running on port ${port}`))

server.on('unhandledRejection', (err, promise)=>{
    console.log(`Logged Error:`, error)
    server.close(process.exit(1))
})