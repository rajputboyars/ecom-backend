// import Product from '../models/product.js';

import Product from "../models/Product.js";

export async function createProduct(req, res) {
  const { name, description, price, categoryId, attributes, gallery } = req.body;

  try {
    const newProduct = new Product({ name, description, price, category: categoryId, attributes, gallery });
    await newProduct.save();
    res.status(201).json({message:"product added successfully",success:true,newProduct});
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json({products,totalProducts:products.length});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
}

export async function getProductById(req, res) {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
}

export async function updateProduct(req, res) {
  const { productId } = req.params;
  const { name, description, price, categoryId, attributes, gallery } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description, price, category: categoryId, attributes, gallery }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
}

export async function deleteProduct(req, res) {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
}
