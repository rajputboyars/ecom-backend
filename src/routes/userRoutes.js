import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Get all users (Admin only)
router.get('/', verifyToken, isAdmin, getAllUsers);

// Get a specific user by ID (Admin only)
router.get('/user/:userId', verifyToken, getUserById);

// Update a user's information (Admin only)
router.put('/:userId', verifyToken, isAdmin, updateUser);

// Delete a user (Admin only)
router.delete('/user/:userId', verifyToken, isAdmin, deleteUser);

export default router;
