const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

// GET /users
router.get('/users', UserController.getUsers)

// GET /users/:id
router.get('/users/:id', UserController.getUserById)

// POST /users
router.post('/users', UserController.createUser)

// PUT /users/:id
router.put('/users/:id', UserController.updateUser)

// DELETE /users/:id
router.delete('/users/:id', UserController.deleteUser)

module.exports = router
