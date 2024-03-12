const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    nameProduct: { type: String, required: true },
    price: { type: Number },
    imageUrl: { type: String }
});

module.exports = model('Product', ProductSchema);