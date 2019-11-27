const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
    constructor(username, email, cart) {
        this.username = username;
        this.email = email;
        this.cart = cart; //An object with items: cart = {items:[]}
    }

    static findById(userId) {
        const db = getDb();
        return db.collection("users")
            .findOne({ _id: new mongodb.ObjectId(userId) });
    }

    addToCart(product) {
        // //check the cart object to see if the product exists in it
        // const cartProduct = this.cart.findIndex(cp => {
        //     cp._id === product._id;
        // });
        const updatedCart = { items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1 }] };
        const db = getDb();
        return db.collection('users')
            .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
    }

    save() {
        const db = getDb();
        return db.collection("users").insertOne(this);
    }
}

module.exports = User;