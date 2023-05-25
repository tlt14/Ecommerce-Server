const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Đăng ký
exports.signup = async (req, res) => {
  try {
    const { username, password, email } = req.body
    // Kiểm tra xem email đã được sử dụng trước đó hay chưa
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Email đã được sử dụng bởi tài khoản khác' })
    }
    // Tạo mới tài khoản người dùng
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      email,
      password: hashedPassword,
    })
    await user.save()
    res.status(201).json({ message: 'Tài khoản đã được tạo thành công.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    // Kiểm tra xem email có tồn tại trong database không
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Email hoặc mật khẩu không chính xác.' })
    }
    // Kiểm tra tính đúng đắn của mật khẩu
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: 'Email hoặc mật khẩu không chính xác.' })
    }
    // Tạo token và gửi về client
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '360d' },
    )
    // Lưu trữ token trong cookie hoặc local storage của khách hàng
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    }) // Sử dụng cookie để lưu trữ token an toàn hơn
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.profile = async (req, res) => {
  res.json({ user: req.user })
}

exports.logout = (req, res) => {
  // Xóa cookie chứa token
  res.clearCookie('token')
  res.status(200).json({ message: 'Đăng xuất thành công' })
}
