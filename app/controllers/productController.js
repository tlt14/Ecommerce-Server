const { default: mongoose } = require('mongoose')
const Product = require('../models/Product')
const { ObjectId } = require('mongodb')

// Lấy tất cả sản phẩm với phân trang
exports.getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 8
  const category = req.query.category
  const search = req.query.search
  const query = {}

  if (category) {
    query.category = new ObjectId(category)
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' }
  }

  try {
    const totalProducts = await Product.countDocuments(query)
    const totalPages = Math.ceil(totalProducts / limit)
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('category')

    if (!products.length) {
      return res.status(404).json({ msg: 'No products found' })
    }

    res.status(200).json({ products, totalPages })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Lấy ra các sản phẩm mới nhất
exports.getNewestProducts = async (req, res) => {
  try {
    const products = await Product.find().sort('-created_at').limit(8)
    res.json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Lấy ra các sản phẩm bán chạy nhất
exports.getBestSellingProducts = async (req, res) => {
  try {
    const products = await Product.find().sort('-rating').limit(8)
    res.json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Tìm kiếm sản phẩm theo tên hoặc mô tả
exports.searchProducts = async (req, res) => {
  const { keyword } = req.query
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    })
    if (!products.length) {
      return res.status(404).json({ msg: 'No products found' })
    }
    res.json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Lấy một sản phẩm theo ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' })
    }
    res.json(product)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Tạo mới một sản phẩm
exports.createProduct = async (req, res) => {
  const {
    name,
    price,
    images,
    description,
    category,
    brand,
    sizes,
    colors,
    rating,
  } = req.body
  try {
    let product = new Product({
      name,
      price,
      images,
      description,
      category,
      brand,
      sizes,
      colors,
      rating,
    })

    await product.save()

    res.json(product)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Cập nhật thông tin của một sản phẩm
exports.updateProduct = async (req, res) => {
  const {
    name,
    price,
    images,
    description,
    category,
    brand,
    sizes,
    colors,
    rating,
  } = req.body

  const updatedProduct = {}
  if (name) updatedProduct.name = name
  if (price) updatedProduct.price = price
  if (images) updatedProduct.images = images
  if (description) updatedProduct.description = description
  if (category) updatedProduct.category = category
  if (brand) updatedProduct.brand = brand
  if (sizes) updatedProduct.sizes = sizes
  if (colors) updatedProduct.colors = colors
  if (rating) updatedProduct.rating = rating

  try {
    let product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' })
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updatedProduct },
      { new: true },
    )

    res.json(product)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Xóa một sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' })
    }

    await Product.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Product removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}
