const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Middleware để kiểm tra mã token
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục.' })
  }

  try {
    // Xác thực mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: decoded.userId }
    next()
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: 'Mã Token không hợp lệ.' })
  }
}
async function verifyToken(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập' })
  }

  try {
    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Lưu trữ thông tin người dùng trong đối tượng req để sử dụng cho các yêu cầu tiếp theo
    const user = await User.findOne({ _id: decoded.userId })
    const { password, ...other } = user._doc
    req.user = other

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Mã thông báo không hợp lệ' })
  }
}
module.exports = verifyToken
