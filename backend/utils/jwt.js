import jwt from 'jsonwebtoken';  // Import JWT for token verification
import { errorHandler } from './error.js';  // Import custom error handler

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];  // Get authorization header from request
  const token = authHeader.split(' ')[1];  // Extract token from header (assumes 'Bearer <token>')

  if (!authHeader || !token) return next(errorHandler(403, 'Not Authorized'));  // Check if token exists

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using JWT_SECRET
    req.user = decoded;  // Attach the decoded token data to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return next(errorHandler(403, 'Invalid token'));  // Handle invalid token
  }
};

export { verifyToken };  // Export the verifyToken middleware
