require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const chatRouter = require('express')()
const { User, Message, Chat } = require('../db/models')
let { JWT_SECRET } = process.env

chatRouter.use(async (req, res, next) => {
    try {
        const { token } = req.body
        if (token) {
            const { id } = jwt.decode(token, JWT_SECRET)
            req.body.requesterId = id
            next()
        } else {
            res.status(403).send({ message: "You are not signed in (Missing Token)" })
        }
    } catch (error) {
        res.status(403).send({ message: 'Possible malformed token or server errror' })
    }
})

chatRouter.post('/new', async (req, res) => {
    const { users, name, requesterId } = req.body

    // await Chat.findOne({
    //     where: {name: name}
    // }).then((chat) => {
    //     if (chat > 0){
    //         res.status(400).send({message: "Chat with that name already exists"})
    //     }
    // })

    const newChat = await Chat.create({
        name: name,
        ownerId: requesterId
    })

    for (let username of users) {
        const user = await User.findOne({
            where:
                { username: username }
        })
        if (user) {
            await newChat.addUser(user)
        } else {
            res.status(400).send({ message: `User ${username} does not exist` })
            await newChat.destroy
            return
        }
    }

    await newChat.save()
    res.status(200).send({ message: 'Chat has been created' })

})

//send message to chat
chatRouter.post('/:chatId', async (req, res) => {
    try {
        const { message, requesterId } = req.body
        const { chatId } = req.params

        const chat = await Chat.findByPk(chatId)
        if (chat) {
            const sender = await User.findByPk(requesterId)
            const newMessage = await Message.create({
                content: message,
                chat_id: chat.id,
                user_id: sender.id,
            })
            res.sendStatus(200)
        } else {
            res.status(404).send({ message: "Chat does not exist" })
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

//get chat [nMessages] messages from chat [chatId] starting at message [sIndex]
chatRouter.get('/:chatId/:sIndex/:nMessages', async (req, res) => {

})

module.exports = chatRouter