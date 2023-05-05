require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRouter = require('express')()
const {User} = require('../db/models')
let {JWT_SECRET, SALT_LENGTH} = process.env
SALT_LENGTH = parseInt(SALT_LENGTH)
userRouter.get('/all', async (req,res) => {
    try {
        const users = await User.findAll()
        res.status(200).send(users)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

userRouter.post('/register', async (req,res) => {
    try {
        const {username, password} = req.body
        
        const users = await User.findAll({
            where:
            {username: username}
        })
        if (users.length > 0){
            res.status(401).send({message:'Username is already in use'})
            return
        }

        const hashedPw = await bcrypt.hash(password, SALT_LENGTH)
        const newUser = await User.create({
            username,
            password: hashedPw
        })

        const token = jwt.sign({username, id:newUser.id}, JWT_SECRET)
        res.status(200).send(token)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

userRouter.post('/login', async (req,res) => {
    try {
        const {username, password} = req.body
        
        const user = await User.findOne({
            where:
            {username: username}
        })

        if (user){
            const match = await bcrypt.compare(password, user.password)
            if (match === true){
                const token = jwt.sign({username, id:user.id}, JWT_SECRET)
                res.status(200).send(token)
            } else {
                res.status(403).send({message: 'Incorrect Password'})
            }

            
        } else {
            res.status(403).send({message:'Account does not exist'})
        }
        

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})



module.exports = userRouter