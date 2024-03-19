const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    carModel: {
      type: String,
      required: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{11}$/.test(v)
        },
        message: props =>
          `${props.value} is not a valid phone number! Must be 11 digits.`,
      },
    },
    city: {
      type: String,
      required: true,
    },
    maxPictures: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    pictures: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema)