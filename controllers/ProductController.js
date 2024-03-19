const Product = require("../models/productModel");
const ProductValidation = require("../validations/ProductValidation");

const createProduct = async (req, res) => {
  try {
    const { error } = ProductValidation.ProductDetailValidator.validate(
      req.body
    );
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { carModel, price, phoneNumber, city, maxPictures, userId } =
      req.body;
    const files = req.files;
    const imageUrls = [];

    files.forEach((file) => {
      const productUrl = file.filename;
      imageUrls.push(`http://localhost:8000/images/${productUrl}`);
    });

    const product = new Product({
      userId: userId,
      pictures: imageUrls,
      carModel: carModel,
      price: price,
      phoneNumber: phoneNumber,
      city: city,
      maxPictures: maxPictures,
    });

    const productSaved = await product.save();
    return res.status(200).json({
      success: true,
      message: "Product Add Successfully",
      data: productSaved,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

module.exports = {
  createProduct,
};
