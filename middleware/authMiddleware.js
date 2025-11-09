const jwt = require("jsonwebtoken");
const secretkey = "Your secret key";

//Middleware to verify JWT 
function authMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Access Denied. No token Provided.:" });
    try {
        const decoded = jwt.verify(token, secretkey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid Token" });

    }
}

module.exports = authMiddleware;