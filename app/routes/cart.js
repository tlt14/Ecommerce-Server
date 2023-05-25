const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')

// GET /carts/:userId
router.get('/carts/:userId', CartController.getCartByUserId)

// POST /carts
router.post('/carts', CartController.createCart)

// POST /carts/:userId/items
router.post('/carts/:userId/items', CartController.addToCart)

// PUT /carts/:userId/items
router.put('/carts/:userId/items', CartController.updateCartItemQuantity)

// DELETE /carts/:userId/items
router.delete('/carts/:userId/items', CartController.removeFromCart)

// DELETE /carts/:userId
router.delete('/carts/:userId', CartController.clearCart)

module.exports = router
