const {DataTypes} = require('sequelize');
const db = require('../db');

const Journal = db.define('daily log', {
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER
    }
});
module.exports = Journal;
