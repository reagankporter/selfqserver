    const { DataTypes } = require('sequelize');
    const db = require('../db');  
    
    const User = db.define('user', {
    username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
            },
    email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
            },
    password: {
     type: DataTypes.STRING,
    allowNull: false,
                },
    });
 
module.exports = User;
