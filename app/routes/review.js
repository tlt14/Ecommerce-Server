const express = require('express')
const router = express.Router()
const ReviewController = require('../controllers/reviewController')

// GET /reviews/:productId
router.get('/reviews/:productId', ReviewController.getReviewsByProductId)

// POST /reviews
router.post('/reviews', ReviewController.createReview)

// PUT /reviews/:id
router.put('/reviews/:id', ReviewController.updateReview)

// DELETE /reviews/:id
router.delete('/reviews/:id', ReviewController.deleteReview)

module.exports = router
