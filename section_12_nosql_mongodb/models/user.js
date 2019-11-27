const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    static findById(userId) {
        const db = getDb();
        return db.collection("users")
            .findOne({ _id: new mongodb.ObjectId(userId) });
    }

    save() {
        const db = getDb();
        return db.collection("users").insertOne(this);
    }
}

module.exports = User;