const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');

const paypalKeys = require('../keys/paypal');
const paypalCheckoutSdk = require('@paypal/checkout-server-sdk');
const paypalHttpClient = new paypalCheckoutSdk.core.PayPalHttpClient(new paypalCheckoutSdk.core.SandboxEnvironment(
    paypalKeys.bus_client_id, paypalKeys.bus_secret
));


const ITEMS_PER_PAGE = 3;

exports.getProducts = (req, res, next) => {
    let page;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    let totalItems = 0;
    Product.find()
        .countDocuments()
        .then(numberProducts => {
            totalItems = numberProducts;
            return Product
                .find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        }).then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
                currentPage: page,
                hasNext: page * ITEMS_PER_PAGE < totalItems,
                hasPrevious: page > 1,
                previousPage: page - 1,
                nextPage: page + 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

exports.getIndex = (req, res, next) => {
    let page;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }

    let totalItems = 0;
    Product.find()
        .countDocuments()
        .then(numProducts => {
            totalItems = numProducts;
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                currentPage: page,
                hasNext: page * ITEMS_PER_PAGE < totalItems,
                hasPrevious: page > 1,
                previousPage: page - 1,
                nextPage: page + 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            // console.log(result);
            res.redirect('/cart');
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};
exports.getCheckout = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            let total = 0;
            products.forEach(p => {
                total += p.quantity * p.productId.price;
            })

            res.render('shop/checkout', {
                path: '/checkout',
                pageTitle: 'Checkout',
                products: products,
                totalSum: total,
                data: JSON.stringify({ products: products, totalSum: total })
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
}

exports.postCheckout = async (req, res, next) => {
    let orderId=req.body.orderId;
    let payerId=req.body.payerId;
    let facilitatorAccessToken=req.body.facilitatorAccessToken;
    
    alert("Inside postCheckout!!! \n"+orderId);

}
/*
    To do
    */
exports.postPaypalOrder = async (req, res, next) => {
    // 2a. Get the order ID from the request body
    const orderData = req.body.orderData;

    // 3. Call PayPal to get the transaction details
    let request = new paypalCheckoutSdk.orders.OrdersGetRequest(orderID);

    let order;
    try {
        order = await paypalHttpClient.client().execute(request);
    } catch (err) {

        // 4. Handle any errors from the call
        console.error(err);
        return res.send(500);
    }

    // 5. Validate the transaction details are as expected
    if (order.result.purchase_units[0].amount.value !== '220.00') {
        return res.send(400);
    }

    // 6. Save the transaction in your database
    // await database.saveTransaction(orderID);

    // 7. Return a successful response to the client
    return res.send(200);
}
exports.getCheckoutSuccess = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

exports.getCheckoutCancel = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;

    Order.findById(orderId)
        .then(order => {
            if (!order) {
                console.log("No order found!!!");
                return next(new Error("No order found!"));
            }

            if (order.user.userId.toString() !== req.user._id.toString()) {
                console.log("Unauthorized access! Not allowed");
                return next(new Error("Unauthorized Access!"));
            }

            const invoiceName = 'invoice-' + orderId + '.pdf';
            const invoicePath = path.join('data', 'invoices', invoiceName);

            //GENERATE PDF - pdfkit

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"'); // automatically open pdf in browser
            // res.setHeader('Content-Disposition', 'attachment; filename="' + invoiceName + '"'); // automatically download the file in browser

            const pdfDoc = new PDFDocument();

            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(res);

            pdfDoc.fontSize(26).text("Invoice", {
                underline: true
            });
            pdfDoc.text("--------------------------------------------------");
            let totalPrice = 0;
            order.products.forEach(p => {
                totalPrice = totalPrice + (p.quantity * p.product.price);
                pdfDoc.fontSize(14).text(p.product.title + ' - ' + p.quantity + ' x ' + p.product.price);
                pdfDoc.text(" ");
            });
            pdfDoc.fontSize(26).text("--------------------------------------------------");
            pdfDoc.fontSize(20).text("Total Price: $" + totalPrice);
            pdfDoc.end();
        })
        .catch(err => {
            next(err);
        });
}