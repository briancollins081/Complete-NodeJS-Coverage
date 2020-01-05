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
    User.findById("5de485e7cb22470fa93b7720")
        .then((user) => {
            const cart = user.cart ? user.cart : { items: [] };
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://abcnodejs:nodejs-complete@cluster0-h0swz.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                console.log("Creating a new user");
                const user = new User({
                    name: "Andere Brian",
                    email: "briancollins@ac.ke",
                    cart: { items: [] }
                });
                console.log("Saving new user");
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch(err => {
        console.log("Got an error here!");
        console.log(err);
    });