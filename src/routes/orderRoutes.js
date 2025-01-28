import express from 'express';
import { createOrder, getAllOrders, updateOrderStatus, getOrderById } from '../controllers/orderController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new order (User only)
router.post('/', verifyToken, createOrder);

// Get all orders (Admin only)
router.get('/', verifyToken, getAllOrders);

// Get an order by ID (Admin and User can access their orders)
router.get('/:orderId', verifyToken, getOrderById);

// Update order status (Admin only)
router.put('/:orderId/status', verifyToken, updateOrderStatus);

export default router;
