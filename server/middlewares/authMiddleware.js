// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "No token provided"
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;  // Adjusted to assign decoded token to req.user

        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Invalid token"
        });
    }
};
