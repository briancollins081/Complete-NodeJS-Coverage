const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
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
    // Product.findAll({where:{id: productId}})
    //   .then(products => {
    //     res.render('shop/product-detail', {
    //       pageTitle: products[0].title,
    //       product: products[0],
    //       path: '/product'
    //     });
    //   })
    //   .catch(err => console.log(err));

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
    Product.fetchAll()
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
    console.log(req.user.cart);
    req.user
        .getCart()
        .then((cart) => {
            return cart
                .getProducts()
                .then((products) => {
                    res.render("shop/cart", {
                        path: "/cart",
                        pageTitle: "Your Cart",
                        products: products
                    });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
    const pid = req.body.productId;
    console.log('product id is:');
    console.log(pid);

    Product.findById(pid)
        .then((product) => {
            console.log(product);
            return req.user.addToCart(product);
        })
        .then((result) => {
            console.log(result);
            console.log("Product added to cart successfully");
            // res.redirect('/cart');
        })
        .catch((err) => console.log(err));

    // let fetchedCart;
    // let newQuantity = 1;
    // req.user.getCart()
    //     .then(cart => {
    //         fetchedCart = cart;
    //         return cart.getProducts({ where: { id: pid } });
    //     })
    //     .then(products => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0];
    //         }
    //         if (product) {
    //             const oldQty = product.cartItem.quantity; //by sequelize
    //             newQuantity = oldQty + 1;
    //             return product;
    //         }
    //         return Product.findByPk(pid);
    //     })
    //     .then(product => {
    //         return fetchedCart.addProduct(product, {
    //             through: {
    //                 quantity: newQuantity
    //             }
    //         });

    //     })
    //     .then(() => res.redirect('/cart'))
    //     .catch(err => console.log(err));
};

exports.postCartDeleteItem = (req, res, next) => {
    const productId = req.body.productId;
    req.user
        .getCart()
        .then((cart) => {
            return cart.getProducts({ where: { id: productId } });
        })
        .then((products) => {
            const product = products[0];
            //remove prod from cartite table
            return product.cartItem.destroy();
        })
        .then((result) => {
            res.redirect("/cart");
        })
        .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
    let productsToOrder;
    let fetchedCart;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then((products) => {
            productsToOrder = products;
            return req.user.createOrder();
        })
        .then((order) => {
            return order.addProducts(
                productsToOrder.map((product) => {
                    product.orderItem = { quantity: product.cartItem.quantity };
                    return product;
                })
            );
        })
        .then((result) => {
            //clear the cart after adding the order
            if (fetchedCart) {
                fetchedCart.setProducts(null);
            }
        })
        .then((result) => {
            res.redirect("/orders");
        })
        .catch((err) => console.log(err));
};
exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({ include: ["products"] })
        .then((orders) => {
            console.log(orders);
            res.render("shop/orders", {
                path: "/orders",
                pageTitle: "Your Orders",
                orders: orders
            });
        })
        .catch((err) => console.log(err));
};