const Chat = require('./chat.model')
const Message = require('./message.model')
const User = require('./user.model')

Chat.hasMany(User, { foreignKey: 'user_id' })
Chat.hasOne(User, {foreignKey: 'owner_id'})
User.hasMany(Chat, { foreignKey: 'chat_id' })

Message.hasOne(User, { foreignKey: 'user_id' })
User.hasMany(Message, { foreignKey: 'message_id' })

module.exports = { Chat, Message, User }