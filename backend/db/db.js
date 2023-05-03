const { Sequelize } = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'backend/db/database.sqlite',
    logging: false
})

module.exports = db