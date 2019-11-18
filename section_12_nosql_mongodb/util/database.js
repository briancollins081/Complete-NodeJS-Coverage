const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://abcnodejs:nodejs-complete@cluster0-h0swz.mongodb.net/test?retryWrites=true&w=majority')
        .then(client => {
            console.log("CONNECTED!");
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
const getDb = () => {
    if(_db){
        return db;
    }
    throw "No Darabase Found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

