// import Category from '../models/category';

import Category from "../models/Category.js";

export async function createCategory(req, res) {
  const { name, description, parentCategory } = req.body;

  try {
    // Check if the category with the same name and description already exists
    const existingCategory = await Category.findOne({ name, description });

    if (existingCategory) {
      // If a category already exists, return a message saying it's already there
      return res.status(400).json({ message: 'Category with this name and description already exists' });
    }

    const newCategory = new Category({ name, description, parentCategory });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error });
  }
}

export async function getAllCategories(req, res) {
  try {
    const categories = await Category.find().populate('parentCategory');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
}

export async function getCategoryById(req, res) {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId).populate('parentCategory');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
}

export async function updateCategory(req, res) {
  const { categoryId } = req.params;
  const { name, description, parentCategory } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name, description, parentCategory }, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
}

export async function deleteCategory(req, res) {
  const { categoryId } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
}
