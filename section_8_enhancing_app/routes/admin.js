const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();



// /admin/add-product => GET -reaches this route
router.get('/add-product', productsController.getAddProduct);
// /admin/add-product => POST reaches this one
router.post('/add-product', productsController.postAddProduct);

module.exports = router;