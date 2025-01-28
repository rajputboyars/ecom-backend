import { body, validationResult } from 'express-validator';

export function validateRegister() {
  return [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
  ];
}

export function validateLogin() {
  return [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
}

export function validateProduct() {
  return [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('categoryId').notEmpty().withMessage('Category ID is required'),
  ];
}

export function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // Proceed to the next middleware or route handler if validation passes
}
