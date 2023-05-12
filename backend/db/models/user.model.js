const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class User extends Model { }
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    sub:
    {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, { sequelize: db })

module.exports = User