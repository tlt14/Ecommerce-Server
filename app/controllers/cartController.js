const Cart = require('../models/Cart')

// Lấy giỏ hàng của một user
exports.getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      'products.productId',
    )
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Tạo mới một giỏ hàng
exports.createCart = async (req, res) => {
  const { user } = req.body
  try {
    let cart = await Cart.findOne({ user })

    if (cart) {
      return res.status(400).json({ errors: [{ msg: 'Cart already exists' }] })
    }

    cart = new Cart({
      user,
    })

    await cart.save()

    res.json(cart)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body
    const cart = await Cart.findOne({ userId: req.params.userId })
    if (!cart) {
      const newCart = new Cart({
        userId: req.params.userId,
        products: [{ productId, quantity, size }],
      })
      await newCart.save()
      return res.status(201).json(newCart)
    }
    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId,
    )
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity
      await cart.save()
      return res.status(200).json(cart)
    }
    cart.products.push({ productId, quantity, size })
    await cart.save()
    res.status(201).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Cập nhật số lượng của một sản phẩm trong giỏ hàng
exports.updateCartItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body

  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId,
    )
    if (existingProductIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' })
    }
    cart.products[existingProductIndex].quantity = quantity
    await cart.save()
    const cartUpdated = await Cart.findOne({
      userId: req.params.userId,
    }).populate('products.productId')
    res.status(200).json(cartUpdated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Xóa một sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body
  try {
    let cart = await Cart.findOne({ userId: req.params.userId })

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' })
    }
    const itemIndex = cart.products.findIndex((product) => {
      return product.productId.toString() === productId
    })
    if (itemIndex > -1) {
      cart.products.splice(itemIndex, 1)
    } else {
      return res.status(404).json({ msg: 'Item not found in cart' })
    }

    await cart.save()

    const cartUpdated = await Cart.findOne({
      userId: req.params.userId,
    }).populate('products.productId')
    res.status(200).json(cartUpdated)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Xóa toàn bộ giỏ hàng
exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.userId })

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' })
    }

    cart.items = []

    await cart.save()

    res.json({ msg: 'Cart cleared' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}
