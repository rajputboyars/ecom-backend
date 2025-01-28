import express from 'express';
import { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } from '../controllers/productController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import { validateProduct, validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();

// Create a new product (Admin only)
router.post('/', verifyToken, isAdmin, validateProduct(), validateRequest, createProduct);

// Update an existing product (Admin only)
router.put('/:productId', verifyToken, isAdmin, validateProduct(), validateRequest, updateProduct);

// Delete a product (Admin only)
router.delete('/:productId', verifyToken, isAdmin, deleteProduct);

// Get all products
router.get('/', getAllProducts);

// Get a product by its ID
router.get('/:productId', getProductById);

export default router;
