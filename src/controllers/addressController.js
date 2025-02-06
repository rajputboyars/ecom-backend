import User from '../models/user.js';
import { getDataFromToken } from '../utils/getDataFromToken.js';
// import User from "../models/User"; // Ensure you import your User model if you haven't

export async function addAddress(req, res) {
  const userId = getDataFromToken(req);  // Make sure this function returns the correct user ID from the token
  const { address } = req.body;

  // Check if the address is provided
  if (!address || Object.keys(address).length === 0) {
    return res.status(400).json({ message: 'Address data is required' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally log the current state of user addresses for debugging
    console.log("User's current addresses:", user.addresses);

    // Add the new address to the user's addresses array
    user.addresses.push(address);

    // Optionally log the address that will be added for debugging
    console.log("New address to add:", address);

    // Save the updated user document to the database
    await user.save();

    // Return a success response
    res.status(201).json({ message: 'Address added successfully', address });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error adding address:', error);

    // Return an error response
    res.status(500).json({ message: 'Error adding address', error: error.message });
  }
}

export async function getAllAddresses(req, res) {
  const userId = getDataFromToken(req);  // Make sure this function returns the correct user ID from the token

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching addresses', error });
  }
}

export async function updateAddress(req, res) {
  const userId = getDataFromToken(req)
  const { addressId } = req.params;
  const updatedAddress = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    user.addresses[addressIndex] = updatedAddress;
    await user.save();

    res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating address', error });
  }
}

export async function deleteAddress(req, res) {
  const userId = getDataFromToken(req);  // Make sure this function returns the correct user ID from the token
  const { addressId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting address', error });
  }
}
