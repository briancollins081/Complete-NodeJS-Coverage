const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const User = require("./models/user.js");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
    User.findById("5ddf58153efdfb4712ef78b2")
        .then((user) => {
            const cart = user.cart ? user.cart : { items: [] };
            req.user = new User(user.name, user.email, cart, user._id);
            next();
        })
        .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://abcnodejs:nodejs-complete@cluster0-h0swz.mongodb.net/test?retryWrites=true&w=majority')
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });