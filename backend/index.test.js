const app = require('../backend/server')
const request = require('supertest')
const seed = require('./db/seed')
const db = require('./db/db')
const { Chat, Message, User } = require('./db/models')


describe('Seed DB', () => {
    it('Seed', async () => {
        await db.sync({
            force: true
        })
    
        await Chat.sync({
            force: true
        })
    
        await Message.sync({
            force: true
        })
    
        await User.sync({
            force: true
        })

        expect(true).toBe(true)
    })
})

describe('User Router', () => {
    it('creating an account', async () => {
        const res = await request(app)
            .post('/user/register')
            .send({
                username: 'test_user',
                password: 'password123'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.text.length).toBeGreaterThan(1)
    })

    it('logging in', async () => {
        const res = await request(app)
            .post('/user/login')
            .send({
                username: 'test_user',
                password: 'password123'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.text.length).toBeGreaterThan(1)
    })

    it('account already exists', async () => {
        const res = await request(app)
            .post('/user/register')
            .send({
                username: 'test_user',
                password: 'password123'
            })
        expect(res.statusCode).toEqual(401)
        expect(JSON.parse(res.text).message).toBe('Username is already in use')
    })

    it('user does not exist', async () => {
        const res = await request(app)
            .post('/user/login')
            .send({
                username: 'not_real',
                password: 'password123'
            })
        expect(res.statusCode).toEqual(403)
        expect(JSON.parse(res.text).message).toBe('Account does not exist')
    })

    it('wrong password', async () => {
        const res = await request(app)
            .post('/user/login')
            .send({
                username: 'test_user',
                password: 'wrong_password'
            })
        expect(res.statusCode).toEqual(403)
        expect(JSON.parse(res.text).message).toBe('Incorrect Password')
    })
})

describe('Creating Chats', () => {
    let token;
    it('logging in and setting token', async () => {
        const res = await request(app)
            .post('/user/login')
            .send({
                username: 'test_user',
                password: 'password123'
        })
        expect(res.statusCode).toEqual(200)
        token = res.text

    })
    
    it('creating a chat', async () => {
        const res = await request(app)
            .post('/chat/new')
            .send({
                headers:{Authorization: token},
                name: 'Test Chat',
                members: ['test_user']
            })
            expect(res.statusCode).toEqual(200)
    })

    it('new chat: user does not exit', async () => {
        const res = await request(app)
            .post('/chat/new')
            .send({
                headers:{Authorization: token},
                name: 'Fail Chat',
                members: ['test_user', 'not_real']
            })
            expect(res.statusCode).toEqual(400)
            expect(JSON.parse(res.text).message).toBe('User not_real does not exist')
    })
})