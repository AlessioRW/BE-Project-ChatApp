const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Message extends Model { }
Message.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { sequelize: db })

module.exports = Message