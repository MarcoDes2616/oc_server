const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader?.split(' ')[1];
    if (!authHeader?.startsWith('Bearer ') || !token) return res.sendStatus(401);

    try {
        const {user, iat} = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = user;
        req.iat = iat;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = verifyJWT;