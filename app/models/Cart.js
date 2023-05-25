const mongoose = require('mongoose')

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true },
  size: { type: String },
})

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [CartItemSchema],
})

module.exports = mongoose.model('Cart', CartSchema)
