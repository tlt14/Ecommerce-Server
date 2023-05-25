const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/auth");

// Đăng ký
router.post("/signup", authController.signup);

// Đăng nhập
router.post("/login", authController.login);
router.get("/logout", verifyToken, authController.logout);
router.get("/profile", verifyToken, authController.profile);
router.post("/register", authController.signup);
module.exports = router;
