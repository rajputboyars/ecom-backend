export function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied. Admins only.' });
    }
    next(); // Proceed if the user is an admin
  }
  