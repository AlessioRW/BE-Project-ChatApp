const express = require('express')
const app = express()
const db = require('./db/db')
const { Chat, User, Message } = require('./db/models')

const handleUserRouter = require('./routes/user.router.')

const port = 3000

app.use(express.json());
app.use('/user', handleUserRouter)

app.listen(port, async () => {
    console.log(`Server Running on  localhost:${3000}`)
})