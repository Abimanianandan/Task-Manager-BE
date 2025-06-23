const jwt = require("jsonwebtoken");
const Config = require("../utils/Config");

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, Config.Secret_KEY || "your-secret-key");
    
    if (decoded.name !== "Abimani") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = isAdmin;
