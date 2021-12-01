const {DataTypes} = require('sequelize');
const db = require('../db');

const journal = db.define('journal', {

    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    howDay: {
        type: DataTypes.STRING,
        allowNull: false
    },
    improveDay: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER
    }
});
module.exports = journal;
