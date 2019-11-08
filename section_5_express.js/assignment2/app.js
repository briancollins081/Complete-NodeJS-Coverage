const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// import our routes
const shelfRoute = require('./routes/shelf');
const addBookRoute = require('./routes/admin');

// add our public static path
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, "public")));

// add the admin route for add book
app.use('/admin', addBookRoute);
// normal route for the shelf
app.use(shelfRoute);

// finally add the default route
app.use('/', (req, res, next) => {
    res.status(404).sendFile(__dirname, 'views', '404.html');
});

app.listen(3000);