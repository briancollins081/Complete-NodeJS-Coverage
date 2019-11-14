const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
  }
  static deleteById(productToDeleteId){
    
  }
  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id){
    
  }

};
