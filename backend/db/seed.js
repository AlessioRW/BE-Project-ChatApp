const db = require('./db')
const { Chat, Message, User } = require('./models')

async function seed() {
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

}

seed()
