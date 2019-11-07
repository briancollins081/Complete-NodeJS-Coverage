const express = require('express');

const app = express();

app.use('/users', (req, res, next)=>{
    console.log("Middleware - 2");
    res.send("<h1>This is section five assignment Part II</h1><hr/><ul><li>User 1</li><li>User 2</li></ul>");
});

app.use('/', (req, res, next) => {
    console.log("Middleware - 1");
    res.send("<h1>This is section five assignment Part II</h1><hr/><ul><li>Option 1</li><li>Option 2</li></ul>");
});

app.listen(3000);