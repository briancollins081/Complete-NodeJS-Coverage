const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

// exports.router = router; // you must use the exported name
module.exports = router;  