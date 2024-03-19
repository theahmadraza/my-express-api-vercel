const express = require('express')
const router = express.Router()
const ProductController = require("../controllers/ProductController")
const imageUploader = require('../middlewares/imageUploader')

router.post('/add-product', imageUploader.array('pictures') , ProductController.createProduct)

module.exports = router;