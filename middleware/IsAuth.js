const jwt = require("jsonwebtoken");
const config = require("../utils/Config");

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.Secret_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
const isAdmin = (req, res, next) => {
  if (req.user.name !== "Abimani") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};



module.exports = { isAuth,isAdmin };
