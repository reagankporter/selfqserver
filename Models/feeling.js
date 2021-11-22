const {DataTypes} = require('sequelize');
const db = require('../db');

const Feeling = db.define('feeling', {
    howFeeling: {
        type: DataTypes.STRING,
        allowNull: false
    },

    happyFeeling: {
        type: DataTypes.STRING,
        allowNull: false
    },

    okayFeeling: {
        type: DataTypes.STRING,
        allowNull: false
    },

    sadFeeling: {
        type: DataTypes.STRING,
        allowNull: false
    },

    owner: {
        type: DataTypes.INTEGER
    }
});

module.exports = Feeling;

