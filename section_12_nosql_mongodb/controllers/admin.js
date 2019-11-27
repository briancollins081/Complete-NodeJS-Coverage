const Product = require('../models/product');
const mongodb = require('mongodb');

exports.getAddProduct = (req, res, next) => {
    const editMode = false;
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/edit-product',
        editing: editMode
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, description, imageUrl);
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log("Created Product Successfully!");
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    //fetch info for the product
    const prodId = req.body.productId;
    const utitle = req.body.title;
    const uprice = req.body.price;
    const uimageurl = req.body.imageUrl;
    const udescritpion = req.body.description;
    const product = new Product(
        utitle,
        uprice,
        udescritpion,
        uimageurl,
        new mongodb.ObjectId(prodId)
    );

    product
        .save()
        .then(product => {
            console.log("Product UPDATED!!");
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId)
        .then(() => {
            // console.log('Destroyed Product!!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};
exports.getProducts = (req, res, next) => {
    //req.user.getProducts()
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
};