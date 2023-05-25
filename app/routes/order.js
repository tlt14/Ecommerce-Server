const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/orderController')

// GET /orders
router.get('/orders', OrderController.getOrders)

// GET /orders/:userId
router.get('/orders/:userId', OrderController.getOrdersByUserId)

// POST /orders
router.post('/orders', OrderController.createOrder)

// PUT /orders/:id
router.put('/orders/:id', OrderController.updateOrder)

// DELETE /orders/:id
router.delete('/orders/:id', OrderController.deleteOrder)

module.exports = router
