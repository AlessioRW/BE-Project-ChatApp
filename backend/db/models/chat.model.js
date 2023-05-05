const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Chat extends Model { }
Chat.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { sequelize: db })

module.exports = Chat