// models/authMiddleware.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwtKey = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, jwtKey, (err, user) => {
        if (err) return res.status(401).json({ error: "Token expired" });
        req.user = user;
        next();
    });
};

module.exports = { authMiddleware };
