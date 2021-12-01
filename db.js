const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:"postgres",
    ssl: process.env.ENVIROMENT === "production"
});


module.exports = sequelize;