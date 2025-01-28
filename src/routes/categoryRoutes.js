import express from 'express';
import { createCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById } from '../controllers/categoryController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Create a new category (Admin only)
router.post('/', verifyToken, isAdmin, createCategory);

// Update a category (Admin only)
router.put('/:categoryId', verifyToken, isAdmin, updateCategory);

// Delete a category (Admin only)
router.delete('/:categoryId', verifyToken, isAdmin, deleteCategory);

// Get all categories
router.get('/', getAllCategories);

// Get a specific category by ID
router.get('/:categoryId', getCategoryById);

export default router;
