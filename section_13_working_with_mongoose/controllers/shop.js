const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            console.log(products);
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products"
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then((product) => {
            res.render("shop/product-detail", {
                pageTitle: product.title,
                product: product,
                path: "/product"
            });
        })
        .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/"
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.getCart = (req, res, next) => {
    // console.log(req.user.cart);
    req.user
        .populate('cart.items.productId')
        .execPopulate() //gets us a promise from populate
        .then((user) => {
            console.log(user.cart.items);
            res.render("shop/cart", {
                path: "/cart",
                pageTitle: "Your Cart",
                products: user.cart.items
            });
        })
        .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
    const pid = req.body.productId;
    console.log('product id is:');
    console.log(pid);

    Product.findById(pid)
        .then((product) => {

            // console.log(product);
            return req.user.addToCart(product);
        })
        .then((result) => {
            console.log(result);
            console.log("Product added to cart successfully");
            res.redirect('/cart');
        })
        .catch((err) => console.log(err));
};

exports.postCartDeleteItem = (req, res, next) => {
    const productId = req.body.productId;
    req.user
        .removeFromCart(productId)
        .then((result) => {
            res.redirect("/cart");
        })
        .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
    let productsToOrder;
    let fetchedCart;
    req.user
        .addOrder()
        .then((result) => {
            res.redirect("/orders");
        })
        .catch((err) => console.log(err));
};
exports.getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            // console.log(orders);
            res.render("shop/orders", {
                path: "/orders",
                pageTitle: "Your Orders",
                orders: orders
            });
        })
        .catch((err) => console.log(err));
};