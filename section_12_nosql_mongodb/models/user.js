const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
    constructor(username, email, cart, userid) {
        this.name = username;
        this.email = email;
        this.cart = cart; //An object with items: cart = {items:[]}
        this._id = userid;
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection("users")
            .findOne({ _id: new mongodb.ObjectId(userId) })
            .then((user) => {
                console.log(user);
                return user;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addToCart(product) {
        //check the cart object to see if the product exists in it
        const cartProductIndex = this.cart.items.findIndex((cp) => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const updatedCart = {
            items: updatedCartItems
        };

        const db = getDb();
        return db
            .collection("users")
            .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
    }

    save() {
        const db = getDb();
        return db.collection("users").insertOne(this);
    }
}

module.exports = User;