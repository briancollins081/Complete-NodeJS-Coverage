const getDb = require("../util/database");
const mongodb = require("mongodb");

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    static findById(userId) {
        const db = getDb();
        db.collection("users")
            .find({ _id: new mongodb.ObjectId(userId) })
            .next()
            .then((user) => {
                return user;
            });
        //You can use return findOne({ _id: new mongodb.ObjectId(userId) })
    }

    save() {
        const db = getDb();
        return db
            .collection("users")
            .insertOne(this)
            .then((result) => {
                console.log(`User added successfully ${result}`);
            })
            .catch((err) => console.log(err));
    }
}

module.exports = User;