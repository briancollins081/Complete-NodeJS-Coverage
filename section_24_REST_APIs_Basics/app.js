const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const feedRoutes = require('./router/feed');

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <<form post req>>
app.use(bodyParser.json()); //for json format data

app.use('/feed', feedRoutes);

app.listen(8080);