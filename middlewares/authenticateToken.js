const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;  // Use environment variable for secret key

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer <token>"

  if (token == null) return res.sendStatus(401); // If no token, unauthorized

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid, forbidden
    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
