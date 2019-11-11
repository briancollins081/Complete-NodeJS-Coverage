const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();



// /admin/add-product => GET -reaches this route
router.get('/add-product', adminController.getAddProduct);

// admin /products => GET - reaches this route
router.get('/products', adminController.getProducts);

// /admin/add-product => POST reaches this one
router.post('/add-product', adminController.postAddProduct);

module.exports = router;