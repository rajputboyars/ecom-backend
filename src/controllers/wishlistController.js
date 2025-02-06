import Product from '../models/Product.js';
import User from '../models/user.js';
import { getDataFromToken } from '../utils/getDataFromToken.js';
// import Product from "../models/product";

export async function addToWishlist(req, res) {
  const userId = getDataFromToken(req)
  const { productId } = req.params;

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found' });
    }

    // Check if the product is already in the wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product is already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(201).json({ message: 'Product added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
}

export async function removeFromWishlist(req, res) {
  const userId = getDataFromToken(req)
  const { productId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove product from wishlist
    user.wishlist = user.wishlist.filter(productId => productId.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error });
  }
}

export async function getWishlist(req, res) {
  const userId = getDataFromToken(req)

  try {
    const user = await User.findById(userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
}
