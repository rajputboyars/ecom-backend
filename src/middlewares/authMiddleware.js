import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach user data to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
}
