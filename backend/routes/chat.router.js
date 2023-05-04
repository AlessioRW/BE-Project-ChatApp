require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const chatRouter = require('express')()
const {User, Message, Chat} = require('../db/models')
let {JWT_SECRET} = process.env

chatRouter.post('/new', async (req,res) => {
    const {users, name} = req.body

    const newChat = Chat.build({
        name: name
    })

    for (let username of users){
        User.findOne({
            where:
            {username: username}
        }).then((user) => {})
    }
})

chatRouter.post('/:chatId', async (req,res) => {
    try {
        const {msg, token} = req.body

        const user = jwt.verify(token, JWT_SECRET)
        if (user){
            console.log(user)
        }

    } catch (error) {
        
    }
})

chatRouter.get('/:chatId/:sIndex/:nMessages', async (req,res) => {

})

module.exports = chatRouter