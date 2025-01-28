import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishlistController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add a product to the wishlist
router.post('/', verifyToken, addToWishlist);

// Remove a product from the wishlist
router.delete('/:productId', verifyToken, removeFromWishlist);

// Get all items in the user's wishlist
router.get('/', verifyToken, getWishlist);

export default router;
