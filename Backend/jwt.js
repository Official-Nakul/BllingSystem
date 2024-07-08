const jwt = require("jsonwebtoken");
const jwtSecret = "abc123"; // Ideally, store this in an environment variable for security

// Function to generate a JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret);
};

// Middleware to authenticate and verify JWT token
const jwtAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userData = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized: No token provided" });
  }
};

module.exports = { jwtAuth, generateToken };
