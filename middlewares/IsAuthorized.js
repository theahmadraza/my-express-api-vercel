const jwt = require('jsonwebtoken')

const IsAuthorized = (req, res,  next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token, "=============================")
        const verify = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.decodeToken = verify;
        next();
    } catch (error) {
        res.status(401).json({message: "User Unauthorized"})
    }
};

module.exports =  IsAuthorized;