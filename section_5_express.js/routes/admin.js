const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send("<form name='addproduct' action='/product' method='post'><input type='text' name='title'><button type='submit'>Add a Product</button></form>");
});
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;