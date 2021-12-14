// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect:"postgres",
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// });

// module.exports = sequelize;



// const Sequelize = require('sequelize');
//      
// const sequelize = new Sequelize("postgres://postgres:maple2323@localhost:5432/selfq");
//      
// module.exports = sequelize;




const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:"postgres",
    ssl: process.env.ENVIROMENT === 'production'
})

module.exports = sequelize;