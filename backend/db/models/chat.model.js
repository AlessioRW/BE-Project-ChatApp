const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Chat extends Model { }
Chat.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { sequelize: db })

module.exports = Chat