const { Sequelize } = require('sequelize')
const path = require('path')
require('dotenv').config();

let db
if (process.env.NODE_ENV === 'production'){
    db = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, 'database.sqlite'),
        logging: false
    })
} else if (process.env.NODE_ENV === 'test'){
    db = new Sequelize('sqlite::memory:', {logging: false})
}



module.exports = db