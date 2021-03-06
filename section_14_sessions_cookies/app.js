const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://abcnodejs:nodejs-complete@cluster0-h0swz.mongodb.net/shop';

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
const store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "My Session Secret",
    resave: false,
    setUninitialized: false,
    store: store
}));
//create a user based on data fetched from session which is not a User object but a data object
app.use((req, res, next) => {
    if (!req.session.user) {
        // console.log("User is undefined");
        next();
    } else
        User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
    .connect(
        MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Andere',
                    email: 'andere@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });