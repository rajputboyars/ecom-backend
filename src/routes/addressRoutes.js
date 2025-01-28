import express from 'express';
// import { addAddress, updateAddress, deleteAddress, getAllAddresses, getAddressById } from '../controllers/addressController.js';
import { addAddress, updateAddress, deleteAddress, getAllAddresses } from '../controllers/addressController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add a new address (User only)
router.post('/', verifyToken, addAddress);

// Update an address (User only)
router.put('/:addressId', verifyToken, updateAddress);

// Delete an address (User only)
router.delete('/:addressId', verifyToken, deleteAddress);

// Get all addresses for the logged-in user
router.get('/', verifyToken, getAllAddresses);

// // Get a specific address by ID
// router.get('/:addressId', verifyToken, getAddressById);

export default router;
