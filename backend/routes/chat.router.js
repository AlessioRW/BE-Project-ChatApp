require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

const chatRouter = require('express')()
const { User, Message, Chat } = require('../db/models')
let { JWT_SECRET } = process.env

chatRouter.use(async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token){
            token = req.body.headers.Authorization
        }
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
    try {
        console.log(2)
        const { members, name, requesterId } = req.body
        const newChat = await Chat.create({
            name: name,
            ownerId: requesterId
        })
    
        for (let username of members) {
            const user = await User.findOne({
                where:
                    { username: username }
            })
            if (user) {
                await newChat.addUser(user)
            } else {
                res.status(400).send({ message: `User ${username} does not exist` })
                await newChat.destroy()
                return
            }
        }
    
        await newChat.save()
        res.status(200).send({ message: 'Chat has been created' })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
   

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
    try {
        const { chatId, sIndex, nMessages } = req.params
        const chat = await Chat.findByPk(chatId)
        const messages = (await chat.getMessages()).reverse()

        const returnMessages = []
        for (let i = sIndex; (i - sIndex) < (nMessages); i++) {
            if (messages[i]) {
                const user = await messages[i].getUser()
                messages[i].dataValues.user = user.username //i'm silly
                returnMessages.push(messages[i])
            }
        }
        res.status(200).send({ chat: chat, messages: returnMessages.reverse() })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

//get chat info
chatRouter.get('/:chatId', async (req, res) => {
    try {
        const { chatId } = req.params
        const chat = await Chat.findByPk(chatId)
        res.status(200).send(chat)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

chatRouter.delete('/:messageId', async (req,res) => {
    try {
        const {requesterId} = req.body
        const {messageId} = req.params

        const msg = await Message.findByPk(messageId)
        if (!msg){
            res.status(404).send({message: 'Message does not exist'})
            return
        }

        const chat = await msg.getChat()
        if (chat.ownerId === requesterId){
            await msg.destroy()
            res.sendStatus(200)
        } else {
            res.sendStatus(403).send({messsage: 'Invalid Permissions'})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = chatRouter