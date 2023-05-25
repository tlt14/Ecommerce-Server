const User = require('../models/User')

// Lấy tất cả người dùng
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Lấy một người dùng theo ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Tạo mới một người dùng
exports.createUser = async (req, res) => {
  const { username, password, email } = req.body
  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }

    user = new User({
      username,
      password,
      email,
    })

    await user.save()

    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Cập nhật thông tin của một người dùng
exports.updateUser = async (req, res) => {
  const { username, email, avatar, address, phone_number } = req.body

  const updatedUser = {}
  if (username) updatedUser.username = username
  if (email) updatedUser.email = email
  if (avatar) updatedUser.avatar = avatar
  if (address) updatedUser.address = address
  if (phone_number) updatedUser.phone_number = phone_number

  try {
    let user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedUser },
      { new: true },
    )

    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Xóa một người dùng
exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    await User.findByIdAndRemove(req.params.id)

    res.json({ msg: 'User removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}
