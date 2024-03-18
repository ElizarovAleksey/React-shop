const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyerName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  items: [
    {
      nameProduct: { type: String, required: true },
      imageUrl: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;