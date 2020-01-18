const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const feedRoutes = require('./router/feed');

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <<form post req>>
app.use(bodyParser.json()); //for json format data

//set headers for all our server requests
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoutes);

app.listen(8080);