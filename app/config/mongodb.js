const mongoose = require('mongoose')
// const conn = mongoose.createConnection('mongodb://localhost:27017/truong_dev')

// conn.on('connected', () => {
//   console.log(`Connected to MongoDB `)
// })
// conn.on('error', () => {
//   console.log('MongoDB connection error. Please make sure MongoDB is running.')
// })

// conn.on('disconnect', () => {
//   console.log('MongoDB disconnected')
// })
// module.exports = conn

mongoose
  .connect('mongodb://127.0.0.1:27017/truong_dev')
  .then(() => console.log('Connected!'))
