const mongoose = require('mongoose')
const { Schema } = mongoose
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  rating: { type: Number },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String },
      rating: { type: Number },
      created_at: { type: Date, default: Date.now },
    },
  ],
})

module.exports = mongoose.model('Product', ProductSchema)
