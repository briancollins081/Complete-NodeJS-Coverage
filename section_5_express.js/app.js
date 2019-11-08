const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// add a parser for the body incomming request
app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
    res.send("<form name='addproduct' action='/product' method='post'><input type='text' name='title'><button type='submit'>Add a Product</button></form>");
});
app.post('/product',(req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
});
app.use('/', (req, res, next) => {
    res.send('<h1>Hello from express</h1>');
});


app.listen(3000);