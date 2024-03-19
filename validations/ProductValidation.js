const Joi = require("joi");

const ProductDetailValidator = Joi.object({
    userId : Joi.string(),
    carModel: Joi.string(),
    pictures: Joi.array(),
    city: Joi.string(),
    price: Joi.number(),
    phoneNumber: Joi.number(),
    maxPictures : Joi.number().min(1).max(10).required()
});

module.exports = {
    ProductDetailValidator
}