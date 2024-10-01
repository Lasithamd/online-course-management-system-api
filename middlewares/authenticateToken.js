const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // Use your actual secret key

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer <token>"

  if (!token) {
    console.log('No token provided');
    return res.sendStatus(401); // Unauthorized
  }

  const actualToken = token.split('|')[1];
  console.log('received token:', token); 
  console.log('Actual Token received for verification:', actualToken); // Log the actual token

  jwt.verify(token, JWT_SECRET, (err, user) => {
   
    
    if (err) {
      console.log(token);
      console.log('Token verification failed:', err.message,);
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware/route handler
  });
};

module.exports = authenticateToken;
