import jwt from 'jsonwebtoken';

// Secret key for signing JWT (should be stored in an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// JWT expiration time (e.g., 1 hour)
const JWT_EXPIRATION = '1h';

// Function to generate JWT token
export const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Function to verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
