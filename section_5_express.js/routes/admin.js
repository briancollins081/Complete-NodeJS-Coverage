const express = require('express');

const router = express.Router();

// /admin/add-product => GET -reaches this route
router.get('/add-product', (req, res, next) => {
    res.send("<form name='addproduct' action='/admin/add-product' method='post'><input type='text' name='title'><button type='submit'>Add a Product</button></form>");
});
// /admin/add-product => POST reaches this one
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;