const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const graphqlHTTP = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

const app = express();
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/svg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const ENV_KEYS = require('./keys/keys');

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <<form post req>>
app.use(bodyParser.json()); //for json format data

//add multer after body parser
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use('/images', express.static(path.join(__dirname, 'images')));
//set headers for all our server requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //prevent options request to reach graphql middleware
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
})
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
    formatError(err) {
        if (!err.originalError) {
            return err;
        }
        const message = err.message || 'An error occurred!';
        const data = err.originalError.data;
        const code = err.originalError.code || 500;
        return { message: message, data: data, code: code };
    }
}))
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect(ENV_KEYS.MONGO_DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    });