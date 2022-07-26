const path = require("path");
const fs = require("fs");
class Cart {
  constructor(items = []) {
    this.items = items;
    this.totalPrice = 0;
  }

  static addProduct(product) {
    // Get the existing cart for the user from cart.json
    // If the cart doesn't exist, create a new cart
    // Analyze the cart to see if the product is already in the cart
    // If the product is already in the cart, increase the quantity
    // If the product is not in the cart, add the product to the cart
    // Save the cart back to cart.json

    const cart = fs.existsSync(path.join(__dirname, "../data/cart.json"))
      ? JSON.parse(fs.readFileSync(path.join(__dirname, "../data/cart.json")))
      : {
          items: [],
          totalPrice: 0,
        };

    const productIndex = cart.items.findIndex((item) => item.id === product.id);
    if (productIndex === -1) {
      cart.items.push({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    } else {
      cart.items[productIndex].quantity += 1;
    }

    cart.totalPrice += +product.price;

    fs.writeFileSync(
      path.join(__dirname, "../data/cart.json"),
      JSON.stringify(cart)
    );
  }

  static removeProduct(productId, productPrice) {
    // Get the existing cart for the user from cart.json
    // Analyze the cart to see if the product is in the cart
    // If the product is in the cart, remove the product from the cart
    // Save the cart back to cart.json
    const cart = fs.existsSync(path.join(__dirname, "../data/cart.json"))
      ? JSON.parse(fs.readFileSync(path.join(__dirname, "../data/cart.json")))
      : {
          items: [],
          totalPrice: 0,
        };

    const productIndex = cart.items.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      cart.items.splice(productIndex, 1);
      cart.totalPrice -= productPrice;
    }

    fs.writeFileSync(
      path.join(__dirname, "../data/cart.json"),
      JSON.stringify(cart)
    );
  }

  static getCartItems(callback) {
    const cart = fs.existsSync(path.join(__dirname, "../data/cart.json"))
      ? JSON.parse(fs.readFileSync(path.join(__dirname, "../data/cart.json")))
      : {
          items: [],
          totalPrice: 0,
        };

    callback(cart);
  }
}

module.exports = Cart;
