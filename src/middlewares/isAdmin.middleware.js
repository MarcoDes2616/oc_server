const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1]; 
    try {
        const { user } = jwt.verify(token, process.env.TOKEN_SECRET);
        // if (user.roleId !== 1 || !user.status) {
        //     return res.status(401).json({ message: "Unauthorized" });
        // }
        req.isAdmin = user?.roleId == 1;
        req.userId = user?.id
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = isAdmin;