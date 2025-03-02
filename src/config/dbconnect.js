const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    dialect: "postgres"
});


module.exports = sequelize;