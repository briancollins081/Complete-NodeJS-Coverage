const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const feedRoutes = require('./router/feed');
const ENV_KEYS = require('./keys/keys');

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <<form post req>>
app.use(bodyParser.json()); //for json format data

//set headers for all our server requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoutes);

mongoose.connect(ENV_KEYS.MONGO_DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    });