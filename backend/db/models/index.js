const Chat = require('./chat.model')
const Message = require('./message.model')
const User = require('./user.model')

Chat.hasMany(Message, { foreignKey: 'chat_id' })
Message.belongsTo(Chat, { foreignKey: 'chat_id' })

User.hasMany(Message, { foreignKey: 'user_id' })
Message.belongsTo(User, { foreignKey: 'user_id' })

User.belongsToMany(Chat, { through: 'user_chats' })
Chat.belongsToMany(User, { through: 'user_chats' })
module.exports = { Chat, Message, User }