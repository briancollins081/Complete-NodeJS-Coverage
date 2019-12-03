const Product = require("../models/product");
const Order = require("../models/order");

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
    req.user
        .populate('cart.items.productId')
        .execPopulate() //gets us a promise from populate
        .then((user) => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: {...i.productId._doc } }
            });

            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
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