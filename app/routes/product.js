const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

// GET /products/newest
router.get('/products/newest', ProductController.getNewestProducts)

// GET /products/best-selling
router.get('/products/best-selling', ProductController.getBestSellingProducts)

// GET /products/search?keyword=
router.get('/products/search', ProductController.searchProducts)

// GET /products/:id
router.get('/product/:id', ProductController.getProductById)

// POST /products
router.post('/products', ProductController.createProduct)

// PUT /products/:id
router.put('/products/:id', ProductController.updateProduct)

// DELETE /products/:id
router.delete('/products/:id', ProductController.deleteProduct)

// GET /products
router.get('/products', ProductController.getProducts)

module.exports = router
