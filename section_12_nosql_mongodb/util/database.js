// SEquelize
// const Sequelize = require('sequelize').Sequelize; //constructor function

// const sequelize = new Sequelize('node-complete', 'nodejs', 'Nodejs-complete', {
//     dialect: 'mysql',
//     host: 'localhost'
// });
// module.exports = sequelize;

//Mongo Db
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://abcnodejs:nodejs-complete@cluster0-h0swz.mongodb.net/test?retryWrites=true&w=majority')
        .then(client => {
            console.log("connected!");
            callback(client);
        })
        .catch(err => console.log(err));
};

module.exports = mongoConnect;

