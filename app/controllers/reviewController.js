const Review = require('../models/Review')

// Lấy tất cả đánh giá của một sản phẩm
exports.getReviewsByProductId = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user')
      .sort('-createdAt')
    res.json(reviews)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Tạo mới một đánh giá cho sản phẩm
exports.createReview = async (req, res) => {
  const { user, product, rating, comment } = req.body
  try {
    const review = new Review({
      user,
      product,
      rating,
      comment,
    })

    await review.save()

    res.json(review)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Cập nhật thông tin của một đánh giá
exports.updateReview = async (req, res) => {
  const { rating, comment } = req.body

  try {
    let review = await Review.findById(req.params.id)

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' })
    }

    review.rating = rating
    review.comment = comment

    await review.save()

    res.json(review)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Xóa một đánh giá
exports.deleteReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id)

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' })
    }

    await Review.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Review removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}
