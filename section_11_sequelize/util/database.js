const Sequelize = require('sequelize'); //constructor function

const sequelize = new Sequelize('node-complete', 'nodejs', 'Nodejs-complete', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;