const User = require("../models/userModel");
const AuthValidation = require("../validations/AuthValidation");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  try {
    const { error } = AuthValidation.LoginValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { email, password } = req.body;
    const user = await User.find({ email: email });
    if (user.length < 1) {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    } else {
      const comparePassword = await User.find({ password: password });
      if (comparePassword.length < 1) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid Password" });
      } else {
        const token = jwt.sign(
          {
            userId: user[0]._id,
          },
          process.env.JWT_TOKEN_SECRET,
          {
            expiresIn: "24h",
          }
        );
        return res
          .status(200)
          .json({
            success: true,
            message: "Login Successfully",
            token: token,
            userId: user[0]._id,
          });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

module.exports = {
  handleLogin,
};
