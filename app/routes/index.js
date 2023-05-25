const userRoute = require('./user')
const reviewRoute = require('./review')
const productRoute = require('./product')
const cartRoute = require('./cart')
const orderRoute = require('./order')
const categoryRoute = require('./category')
const brandRoute = require('./brand')
const authRoute = require('./auth')

const express = require('express')
const router = express.Router()

router.use(userRoute)
router.use(reviewRoute)
router.use(productRoute)
router.use(cartRoute)
router.use(orderRoute)
router.use(categoryRoute)
router.use(brandRoute)
router.use(authRoute)

// router.use(authRoute)
module.exports = router
