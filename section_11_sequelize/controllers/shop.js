const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
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

  Product.findByPk(productId)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        product: product,
        path: '/product'
      });
    })
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
}
exports.getCart = (req, res, next) => {
  console.log(req.user.cart);
  req.user.getCart()
    .then(cart => {
      return cart.getProducts().then(products => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        });
      }).catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const pid = req.body.productId;
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart=cart;
      return cart.getProducts({where: {id: pid}});
    })
    .then(products => {
      let product;
      if(products.length > 0){
        product = products[0];
      }
      let newQuantity = 1;
      if(product){
        // check if the product existed
      }
      return Product.findByPk(pid)
      .then(product=>{
        return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
      }).catch(err => console.log(err));;
    })
    .then(()=>res.redirect('/cart'))
    .catch(err => console.log(err));
};

exports.postCartDeleteItem = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
  });

};
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};