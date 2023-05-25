const mongoose = require('mongoose')

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
})

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [OrderItemSchema],
  totalPrice: { type: Number, required: true },
  shippingAddress: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'canceled'],
    default: 'pending',
  },
  created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Order', OrderSchema)
