const express = require('express')
const router = express.Router()
const ValidateMiddleware = require("../middlewares/validate")
const LoginValidation = require("../validations/AuthValidation")
const AuthController = require("../controllers/AuthController")

router.post('/login' ,AuthController.handleLogin)

module.exports = router;