export function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack for debugging
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: err.errors });
    }
  
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate key error' });
    }
  
    // Catch all unexpected errors
    return res.status(500).json({ message: 'Internal Server Error', details: err.message });
  }
  