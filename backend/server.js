const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db/db')
const { Chat, User, Message } = require('./db/models')

const userRouter = require('./routes/user.router')
const chatRouter = require('./routes/chat.router')
const port = 8000

app.use(express.json());
app.use(cors())
app.use('/user', userRouter)
app.use('/chat', chatRouter)

app.get('/', async (req,res) => {
    console.log('Request Recieved')
    res.status(200).send('Request Accepted')
})

app.listen(port, async () => {
    console.log(`Server Running on  localhost:${port}`)
})

module.exports = app