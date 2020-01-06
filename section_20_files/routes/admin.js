const path = require('path');

const express = require('express');
const {body, check} = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, [
    body('title', 'Title must be at least 15 characters long!')
        .trim()
        .isLength({min: 5})
        .isString(),
    /* body('imageUrl', 'Invalid image path, provide a valid url!')
        .trim()
        .isURL(), */
    body('price', 'Price can only be a number!')
        .isFloat()
        .trim(),
    body('description','Descritpion must contain at least 50 characters!')
        .isLength({min: 5})
        .isString()
        .trim(),
], adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, [
    body('title', 'Title must be at least 15 characters long!')
        .trim()
        .isLength({min: 5})
        .isString(),
    body('imageUrl', 'Invalid image path, provide a valid url!')
        .isURL(),
    body('price', 'Price can only be a number!')
        .isFloat()
        .trim(),
    body('description','Descritpion must contain at least 50 characters!')
        .isLength({min: 5})
        .isString()
        .trim(),
], adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;