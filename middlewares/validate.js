const Validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(422).json({ message: "Something went wrong in validation", error: error.details })
    } else {
        next();
    }
}

module.exports = Validate;