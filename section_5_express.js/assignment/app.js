const express = require('express');

const app = express();

app.use((req, res, next)=>{
    console.log("This is the first middleware");
    next();
});

app.use((req, res, next)=>{
    console.log("This is the second middleware");
    res.send("<h1>This is section five assignment</h1>");
});

app.listen(3000);