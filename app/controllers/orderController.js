const Cart = require('../models/Cart')
const Order = require('../models/Order')

// Lấy tất cả đơn hàng
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('items.product')
      .sort('-createdAt')
    res.json(orders)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Lấy đơn hàng của một user
exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('userId')
      .populate('products.productId')
    res.json(orders)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Tạo mới một đơn hàng
exports.createOrder = async (req, res) => {
  const { userId, products, totalPrice, shippingAddress } = req.body
  try {
    const order = new Order({
      userId,
      products,
      totalPrice,
      shippingAddress,
    })
    await order.save()
    let cart = await Cart.findOneAndDelete({ userId })

    res.json({ order, cart })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Cập nhật thông tin của một đơn hàng
exports.updateOrder = async (req, res) => {
  const { status } = req.body

  try {
    let order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' })
    }

    order.status = status

    await order.save()

    res.json(order)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Xóa một đơn hàng
exports.deleteOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' })
    }

    await Order.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Order removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}
