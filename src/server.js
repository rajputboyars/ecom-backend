import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Database connection
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';  // Error handler middleware
import cookieParser from 'cookie-parser';

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to handle CORS (Cross-Origin Resource Sharing)
// app.use(cors());
// const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000' ,  // Frontend URL
  credentials: true,  // Allow cookies
}));

// Middleware to parse incoming request bodies (JSON)
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes (login, register)
app.use('/api/products', productRoutes);  // Product routes (CRUD)
app.use('/api/orders', orderRoutes);  // Order routes (creation, status)
app.use('/api/addresses', addressRoutes);  // User address routes
app.use('/api/users', userRoutes);  // Admin user management routes
app.use('/api/categories', categoryRoutes);  // Category and subcategory routes
app.use('/api/wishlist', wishlistRoutes);  // Wishlist routes

// Global Error Handler (catch all errors)
app.use(errorHandler);

// Define a basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the eCommerce API');
});

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
